import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminPanel() {
  const { user, logout } = useAuth();
  return (
    <div style={{display:"grid",gridTemplateColumns:"240px 1fr",minHeight:"100vh"}}>
      <aside style={{background:"#111",color:"#fff",padding:16}}>
        <h3>Admin</h3>
        <nav style={{display:"grid",gap:8}}>
          <NavLink to="/admin/dashboard" className="admin-link">Dashboard</NavLink>
        </nav>
        <div style={{marginTop:24,fontSize:14}}>
          <div>Signed in as</div>
          <strong>{user?.name} ({user?.role})</strong>
          <button onClick={logout} className="btn btn-sm btn-outline-light" style={{marginTop:8}}>Logout</button>
        </div>
      </aside>
      <main style={{padding:24}}>
        <Outlet />
      </main>
    </div>
  );
}
