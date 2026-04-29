import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const AUTHORIZED_ADMINS = ["gofixclean@gmail.com", "yvesjulio3@gmail.com"];

export default function ProtectedRoute({ children }: any) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (!data.session) {
          navigate("/admin-login");
          return;
        }
        
        setSession(data.session);
        
        if (data.session?.user?.email) {
          const isAdmin = AUTHORIZED_ADMINS.includes(data.session.user.email);
          setIsAuthorized(isAdmin);
          if (!isAdmin) {
            navigate("/");
          }
        } else {
          navigate("/admin-login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/admin-login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || !isAuthorized) {
    return null; // Navigation will happen in useEffect
  }

  return children;
}