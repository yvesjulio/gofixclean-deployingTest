import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <form
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          try {
            const { error } = await supabase.auth.signInWithPassword({
              email: email.trim(),
              password,
            });
            if (error) throw error;
            navigate("/admin");
          } catch {
            setError(
              "Unable to sign in. Check your email and password, then try again.",
            );
          } finally {
            setLoading(false);
          }
        }}
      >
        <h1 className="text-2xl font-bold mb-2">GoFix&Clean</h1>
        <p className="mb-6 text-gray-600">Sign in to your operations desk.</p>
        {error && (
          <p role="alert" className="text-red-700 mb-4">
            {error}
          </p>
        )}
        <label className="block mb-3">
          Email
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </label>
        <label className="block mb-5">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </label>
        <button
          disabled={loading}
          className="w-full bg-green-800 text-white py-3 rounded disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
