import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Route {
  id: string;
  origin: string;
  destination: string;
  price: number;
}

export default function RouteManagement() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [newRoute, setNewRoute] = useState({
    origin: '',
    destination: '',
    price: 0
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  async function fetchRoutes() {
    try {
      setLoading(true);
      setError('');
      
      const { data, error: fetchError } = await supabase
        .from('routes')
        .select('*')
        .order('origin');
      
      if (fetchError) {
        throw fetchError;
      }
      
      setRoutes(data || []);
    } catch (err) {
      console.error('Error fetching routes:', err);
      setError('Failed to load routes. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  async function createRoute() {
    try {
      setError('');
      const { error: createError } = await supabase
        .from('routes')
        .insert([newRoute]);

      if (createError) {
        throw createError;
      }

      setNewRoute({ origin: '', destination: '', price: 0 });
      await fetchRoutes();
    } catch (err) {
      console.error('Error creating route:', err);
      setError('Failed to create route. Please try again.');
    }
  }

  async function updateRoute(id: string) {
    if (!editingRoute) return;

    try {
      setError('');
      const { error: updateError } = await supabase
        .from('routes')
        .update({
          origin: editingRoute.origin,
          destination: editingRoute.destination,
          price: editingRoute.price
        })
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      setEditingRoute(null);
      await fetchRoutes();
    } catch (err) {
      console.error('Error updating route:', err);
      setError('Failed to update route. Please try again.');
    }
  }

  async function deleteRoute(id: string) {
    try {
      setError('');
      const { error: deleteError } = await supabase
        .from('routes')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      await fetchRoutes();
    } catch (err) {
      console.error('Error deleting route:', err);
      setError('Failed to delete route. Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Route Management</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      {/* Add New Route */}
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Add New Route</h3>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Origin"
            className="border rounded p-2"
            value={newRoute.origin}
            onChange={(e) => setNewRoute({ ...newRoute, origin: e.target.value.toUpperCase() })}
          />
          <input
            type="text"
            placeholder="Destination"
            className="border rounded p-2"
            value={newRoute.destination}
            onChange={(e) => setNewRoute({ ...newRoute, destination: e.target.value.toUpperCase() })}
          />
          <input
            type="number"
            placeholder="Price"
            className="border rounded p-2"
            value={newRoute.price}
            onChange={(e) => setNewRoute({ ...newRoute, price: Number(e.target.value) })}
          />
          <button
            onClick={createRoute}
            className="bg-blue-600 text-white rounded p-2 flex items-center justify-center hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-1" /> Add Route
          </button>
        </div>
      </div>

      {/* Routes Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Origin
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {routes.map((route) => (
              <tr key={route.id}>
                {editingRoute?.id === route.id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        className="border rounded p-1 w-full"
                        value={editingRoute.origin}
                        onChange={(e) => setEditingRoute({
                          ...editingRoute,
                          origin: e.target.value.toUpperCase()
                        })}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        className="border rounded p-1 w-full"
                        value={editingRoute.destination}
                        onChange={(e) => setEditingRoute({
                          ...editingRoute,
                          destination: e.target.value.toUpperCase()
                        })}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        className="border rounded p-1 w-full"
                        value={editingRoute.price}
                        onChange={(e) => setEditingRoute({
                          ...editingRoute,
                          price: Number(e.target.value)
                        })}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateRoute(route.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Save className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setEditingRoute(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">{route.origin}</td>
                    <td className="px-6 py-4">{route.destination}</td>
                    <td className="px-6 py-4">${route.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingRoute(route)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteRoute(route.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}