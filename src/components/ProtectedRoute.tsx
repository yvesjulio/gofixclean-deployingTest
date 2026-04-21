import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Navigate } from "react-router-dom";

const AUTHORIZED_ADMINS = ["gofixclean@gmail.com", "yvesjulio3@gmail.com"];

export default function ProtectedRoute({ children }: any) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      
      if (data.session?.user?.email) {
        const isAdmin = AUTHORIZED_ADMINS.includes(data.session.user.email);
        setIsAuthorized(isAdmin);
      }
      
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  if (!session) return <Navigate to="/admin-login" />;

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-600">You are not authorized to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
}