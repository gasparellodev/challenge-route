import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Plane } from 'lucide-react';
import RouteManagement from './components/RouteManagement';
import RouteQuery from './components/RouteQuery';
import { isSupabaseConfigured } from './lib/supabase';

function App() {
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Plane className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Database Connection Required
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Please click the "Connect to Supabase" button in the top right corner to set up your database connection.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <p className="text-blue-700 text-sm">
              This will automatically create the necessary environment variables needed to connect to your Supabase database.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Plane className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    Travel Route Optimizer
                  </span>
                </div>
                <div className="ml-6 flex space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600"
                  >
                    Route Management
                  </Link>
                  <Link
                    to="/query"
                    className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600"
                  >
                    Find Best Route
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<RouteManagement />} />
            <Route path="/query" element={<RouteQuery />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;