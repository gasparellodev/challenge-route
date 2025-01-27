import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { findBestRoute } from '../lib/routeFinder';

interface Route {
  origin: string;
  destination: string;
  price: number;
}

export default function RouteQuery() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState<{ route: string[]; cost: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function findRoute() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data: routes, error: fetchError } = await supabase
        .from('routes')
        .select('origin, destination, price');

      if (fetchError) throw fetchError;

      const bestRoute = findBestRoute(
        routes as Route[],
        origin.toUpperCase(),
        destination.toUpperCase()
      );

      if (!bestRoute) {
        setError('No route found between these locations');
        return;
      }

      setResult(bestRoute);
    } catch (err) {
      console.error('Error finding route:', err);
      setError('An error occurred while finding the route');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Find Best Route</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Origin (e.g., GRU)"
          className="border rounded p-2"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
        />
        <input
          type="text"
          placeholder="Destination (e.g., CDG)"
          className="border rounded p-2"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
        />
        <button
          onClick={findRoute}
          disabled={loading || !origin || !destination}
          className="bg-blue-600 text-white rounded p-2 flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-400"
        >
          <Search className="w-5 h-5 mr-1" />
          {loading ? 'Searching...' : 'Find Route'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-green-50 border border-green-200 p-4 rounded">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Best Route Found!</h3>
          <p className="text-green-700">
            Route: {result.route.join(' → ')}
          </p>
          <p className="text-green-700 mt-2">
            Total Cost: ${result.cost}
          </p>
        </div>
      )}
    </div>
  );
}