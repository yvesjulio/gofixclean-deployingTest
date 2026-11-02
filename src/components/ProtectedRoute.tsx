import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [state, setState] = useState<
    "loading" | "login" | "allowed" | "denied"
  >("loading");
  const [error, setError] = useState("");
  useEffect(() => {
    let current = true;
    async function check() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!data.session) {
          if (current) setState("login");
          return;
        }
        const result = await supabase.rpc("is_operations_admin");
        if (result.error) throw result.error;
        if (current) setState(result.data ? "allowed" : "denied");
      } catch (e) {
        if (current) {
          setError(
            e && typeof e === "object" && "message" in e
              ? String(e.message)
              : "Access check failed",
          );
          setState("denied");
        }
      }
    }
    void check();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && current) setState("login");
      else
        setTimeout(() => {
          if (current) void check();
        }, 0);
    });
    return () => {
      current = false;
      subscription.unsubscribe();
    };
  }, []);
  if (state === "loading") return <p className="p-8">Checking admin access…</p>;
  if (state === "login") return <Navigate to="/admin-login" replace />;
  if (state === "denied")
    return (
      <div className="p-8">
        <h1>Admin access unavailable</h1>
        <p>{error || "This account is not an approved administrator."}</p>
        <p>
          Apply the included admin operations SQL migration and check your admin
          membership.
        </p>
        <a href="#/admin-login">Back to login</a>
      </div>
    );
  return children;
}
