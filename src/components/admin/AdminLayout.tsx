import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/bookings', label: 'Bookings' },
    { path: '/admin/providers', label: 'Providers' },
    { path: '/admin/verifications', label: 'Verifications' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-6 py-3 text-gray-700 hover:bg-gray-200 ${
                location.pathname === item.path ? 'bg-gray-200 border-r-4 border-blue-500' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export { AdminLayout };