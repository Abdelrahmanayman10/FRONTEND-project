import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-root" style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
      <aside style={{ background: "#0f1724", color: "#fff", padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Bistro Admin</div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <NavLink to="/admin/dashboard" style={navLinkStyle} end>Dashboard</NavLink>
          <NavLink to="/admin/users" style={navLinkStyle}>Users</NavLink>
          <NavLink to="/admin/bookings" style={navLinkStyle}>Bookings</NavLink>
          <NavLink to="/admin/menu" style={navLinkStyle}>Menu Items</NavLink>
          <NavLink to="/admin/settings" style={navLinkStyle}>Settings</NavLink>
        </nav>

        <div style={{ marginTop: "auto", fontSize: 13 }}>
          <div style={{ color: "#94a3b8" }}>Signed in as</div>
          <div style={{ fontWeight: 700 }}>{user?.name} ({user?.role})</div>
          <button className="btn btn-sm btn-outline-light" onClick={logout} style={{ marginTop: 12 }}>Logout</button>
        </div>
      </aside>

      <main style={{ padding: 24, background: "#f6f7fb" }}>
        <Outlet />
      </main>
    </div>
  );
}


const navLinkStyle = ({ isActive }) => ({
  padding: "10px 12px",
  borderRadius: 8,
  textDecoration: "none",
  color: isActive ? "#0f1724" : "#e6eef7",
  background: isActive ? "#fff" : "transparent",
  fontWeight: 600,
});
