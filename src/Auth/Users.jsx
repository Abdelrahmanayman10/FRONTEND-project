import React, { useState } from "react";

const initial = [
  { id: 1, name: "Admin", email: "admin@site.com", role: "admin" },
  { id: 2, name: "Ayman", email: "ayman@mail.com", role: "user" },
  { id: 3, name: "Sara", email: "sara@mail.com", role: "user" },
];

export default function Users() {
  const [users, setUsers] = useState(initial);

  const handleDelete = (id) => {
    if (!confirm("Delete this user?")) return;
    setUsers(u => u.filter(x => x.id !== id));
  };

  const toggleRole = (id) => {
    setUsers(u => u.map(x => x.id === id ? { ...x, role: x.role === "admin" ? "user" : "admin" } : x));
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <div style={{ marginTop: 12, background: "#fff", borderRadius: 10, overflow: "hidden" }}>
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
              <tr key={u.id}>
                <td style={td}>{u.id}</td>
                <td style={td}>{u.name}</td>
                <td style={td}>{u.email}</td>
                <td style={td}>{u.role}</td>
                <td style={td}>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => toggleRole(u.id)}>
                    Toggle Role
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = { textAlign: "left", padding: "12px 16px", fontSize: 13, color: "#475569" };
const td = { padding: "12px 16px", borderTop: "1px solid #eef2f7" };
