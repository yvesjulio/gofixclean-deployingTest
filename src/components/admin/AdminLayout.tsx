import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import "./admin.css";
export function AdminLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <div className="ops">
      <aside className="ops-side">
        <a className="ops-brand" href="#/admin">
          GoFix<span>&Clean</span>
          <small>OPERATIONS DESK</small>
        </a>
        <nav>
          {[
            ["/admin", "Overview"],
            ["/admin/bookings", "Bookings"],
            ["/admin/providers", "Providers"],
            ["/admin/customers", "Customers"],
            ["/admin/payments", "Payments"],
            ["/admin/verifications", "Applications"],
            ["/admin/notifications", "Notifications"],
          ].map(([to, text]) => (
            <NavLink key={to} to={to} end={to === "/admin"}>
              {text}
            </NavLink>
          ))}
        </nav>
        <a href="#/">View website ↗</a>
        <button
          onClick={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              alert(error.message);
              return;
            }
            navigate("/admin-login");
          }}
        >
          Sign out
        </button>
      </aside>
      <section className="ops-content">
        <header className="ops-header">
          <div>
            <small>GOFIX&CLEAN / ADMIN</small>
            <h1>{title}</h1>
          </div>
          <span className="ops-pill">Kigali · RWF</span>
        </header>
        <main>{children}</main>
      </section>
    </div>
  );
}
