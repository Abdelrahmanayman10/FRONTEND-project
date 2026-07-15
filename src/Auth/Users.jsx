import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function Users() {
  const { token, API_URL } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token, API_URL]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }
      setUsers(u => u.filter(x => x._id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleRole = async (id) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}/role`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update user role");
      }
      setUsers(u => u.map(x => x._id === id ? { ...x, role: data.role } : x));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 className="fw-bold mb-4" style={{ color: "#0f1724" }}>Manage Users</h1>
      
      {loading ? (
        <div>Loading users...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div style={{ marginTop: 12, background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f1f5f9" }}>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Role</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td style={td}>{u._id.slice(-8).toUpperCase()}</td>
                  <td style={td}>{u.name}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>
                    <span className={`badge rounded-pill px-2.5 py-1 ${u.role === "admin" ? "bg-danger-subtle text-danger" : "bg-primary-subtle text-primary"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td style={td}>
                    <button className="btn btn-sm btn-outline-primary me-2 rounded-3" onClick={() => toggleRole(u._id)}>
                      Toggle Role
                    </button>
                    <button className="btn btn-sm btn-outline-danger rounded-3" onClick={() => handleDelete(u._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th = { textAlign: "left", padding: "14px 18px", fontSize: 13, color: "#475569", fontWeight: 700 };
const td = { padding: "14px 18px", borderTop: "1px solid #eef2f7", fontSize: 14 };
