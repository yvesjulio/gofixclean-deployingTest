import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  totalProviders: number;
  pendingVerifications: number;
  totalBookings: number;
  activeJobs: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProviders: 0,
    pendingVerifications: 0,
    totalBookings: 0,
    activeJobs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [providersRes, verificationsRes, bookingsRes] = await Promise.all([
          supabase.from('providers').select('id', { count: 'exact', head: true }),
          supabase.from('provider_verifications').select('id', { count: 'exact', head: true }),
          supabase.from('bookings').select('id', { count: 'exact', head: true }),
        ]);

        const activeJobsRes = await supabase
          .from('bookings')
          .select('id', { count: 'exact', head: true })
          .in('status', ['in_progress', 'assigned']);

        setStats({
          totalProviders: providersRes.count || 0,
          pendingVerifications: verificationsRes.count || 0,
          totalBookings: bookingsRes.count || 0,
          activeJobs: activeJobsRes.count || 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stats.totalProviders}</div>
            <div className="text-gray-600">Total Providers</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{stats.pendingVerifications}</div>
            <div className="text-gray-600">Pending Verifications</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.totalBookings}</div>
            <div className="text-gray-600">Total Bookings</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{stats.activeJobs}</div>
            <div className="text-gray-600">Active Jobs</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <a href="/admin/verifications" className="block w-full bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700">
                Review Verifications ({stats.pendingVerifications})
              </a>
              <a href="/admin/providers" className="block w-full bg-green-600 text-white py-2 px-4 rounded text-center hover:bg-green-700">
                Manage Providers ({stats.totalProviders})
              </a>
              <a href="/admin/bookings" className="block w-full bg-purple-600 text-white py-2 px-4 rounded text-center hover:bg-purple-700">
                Manage Bookings ({stats.totalBookings})
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="text-gray-500 text-sm">
              Activity feed coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
