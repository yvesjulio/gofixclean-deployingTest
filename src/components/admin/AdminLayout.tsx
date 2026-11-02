import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiCalendar,
  FiUsers,
  FiUser,
  FiCreditCard,
  FiClipboard,
  FiBell,
  FiMenu,
  FiX,
  FiLogOut,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import "./admin.css";
const navigation = [
  { to: "/admin", label: "Overview", Icon: FiGrid },
  { to: "/admin/bookings", label: "Bookings", Icon: FiCalendar },
  { to: "/admin/providers", label: "Providers", Icon: FiUsers },
  { to: "/admin/customers", label: "Customers", Icon: FiUser },
  { to: "/admin/payments", label: "Payments", Icon: FiCreditCard },
  { to: "/admin/verifications", label: "Applications", Icon: FiClipboard },
  { to: "/admin/notifications", label: "Notifications", Icon: FiBell },
];
export function AdminLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(() => {
      try {
        return localStorage.getItem("gofix-admin-collapsed") === "true";
      } catch {
        return false;
      }
    }),
    [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (mobileOpen) closeRef.current?.focus();
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [mobileOpen]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 701px)");
    const change = () => {
      if (media.matches) setMobileOpen(false);
    };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  function toggle() {
    setCollapsed((v) => {
      try {
        localStorage.setItem("gofix-admin-collapsed", String(!v));
      } catch {
        /* preference only */
      }
      return !v;
    });
  }
  return (
    <div
      className={`ops ${collapsed ? "ops-collapsed" : ""} ${mobileOpen ? "ops-mobile-open" : ""}`}
    >
      {mobileOpen && (
        <button
          className="ops-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className="ops-side"
        id="admin-navigation"
        aria-label="Admin navigation"
      >
        <div className="ops-brand-row">
          <NavLink
            to="/admin"
            className="ops-brand"
            aria-label="GoFix and Clean overview"
          >
            <img src="/images/logo.png" alt="GoFix&Clean" />
            <span className="ops-brand-mark">
              GF<span>+</span>
            </span>
          </NavLink>
          <button
            ref={closeRef}
            className="ops-mobile-close ops-icon-button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          >
            <FiX />
          </button>
        </div>
        <span className="ops-nav-caption">WORKSPACE</span>
        <nav>
          {navigation.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
              title={collapsed ? label : undefined}
              onClick={() => setMobileOpen(false)}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="ops-side-bottom">
          <a href="#/" title="View website">
            <FiExternalLink aria-hidden="true" />
            <span>View website</span>
          </a>
          <button
            title="Sign out"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) {
                alert(error.message);
                return;
              }
              navigate("/admin-login");
            }}
          >
            <FiLogOut aria-hidden="true" />
            <span>Sign out</span>
          </button>
          <button
            className="ops-collapse-control"
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={toggle}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
            <span>Collapse sidebar</span>
          </button>
        </div>
      </aside>
      <section className="ops-content" inert={mobileOpen}>
        <header className="ops-header">
          <div className="ops-header-start">
            <button
              className="ops-menu-mobile ops-icon-button"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              aria-controls="admin-navigation"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu />
            </button>
            <button
              className="ops-menu-desktop ops-icon-button"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              aria-controls="admin-navigation"
              onClick={toggle}
            >
              <FiMenu />
            </button>
            <div>
              <h1>{title}</h1>
            </div>
          </div>
          <NavLink className="ops-header-logo" to="/admin">
            <img src="/images/logo.png" alt="GoFix&Clean" />
          </NavLink>
        </header>
        <main>{children}</main>
        <footer className="ops-footer">GoFix&Clean</footer>
      </section>
    </div>
  );
}
