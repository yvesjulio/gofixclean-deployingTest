import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface VerificationRequest {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  service_type: string;
  about: string;
  created_at: string;
}

export default function ProviderVerification() {
  const [verifications, setVerifications] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const { data, error } = await supabase
        .from('provider_verifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVerifications(data || []);
    } catch (err) {
      console.error('Error fetching verifications:', err);
      setError('Failed to load verification requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (verification: VerificationRequest) => {
    setProcessing(verification.id);
    try {
      // Insert into providers table
      const { error: insertError } = await supabase
        .from('providers')
        .insert({
          full_name: verification.full_name,
          phone: verification.phone,
          service_type: verification.service_type,
          base_location: verification.address,
          notes: verification.about,
          status: 'active',
          is_approved: true,
        });

      if (insertError) throw insertError;

      // Remove from verifications
      const { error: deleteError } = await supabase
        .from('provider_verifications')
        .delete()
        .eq('id', verification.id);

      if (deleteError) throw deleteError;

      alert('Provider approved successfully!');
      fetchVerifications();
    } catch (err) {
      console.error('Error approving provider:', err);
      alert('Failed to approve provider');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (verification: VerificationRequest) => {
    if (!confirm('Are you sure you want to reject this application?')) return;

    setProcessing(verification.id);
    try {
      const { error } = await supabase
        .from('provider_verifications')
        .delete()
        .eq('id', verification.id);

      if (error) throw error;

      alert('Application rejected');
      fetchVerifications();
    } catch (err) {
      console.error('Error rejecting application:', err);
      alert('Failed to reject application');
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Provider Verifications</h1>
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Provider Verifications</h1>
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Provider Verifications</h1>

        {verifications.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500">No pending verifications</p>
          </div>
        ) : (
          <div className="space-y-4">
            {verifications.map((verification) => (
              <div key={verification.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{verification.full_name}</h3>
                    <p className="text-gray-600">📞 {verification.phone}</p>
                    <p className="text-gray-600">📍 {verification.address}</p>
                    <p className="text-blue-600 font-medium">{verification.service_type}</p>
                    <p className="text-gray-700 mt-2">{verification.about}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Applied: {new Date(verification.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(verification)}
                      disabled={processing === verification.id}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      {processing === verification.id ? 'Processing...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleReject(verification)}
                      disabled={processing === verification.id}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}