import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
        <StatCard title="Users" value="1,254" />
        <StatCard title="Orders" value="3,412" />
        <StatCard title="Revenue" value="$24,500" />
      </div>

      <section style={{ background: "#fff", padding: 16, borderRadius: 10 }}>
        <h3>Recent Activity</h3>
        <ul>
          <li>User John registered</li>
          <li>New order #1234</li>
          <li>Post "Summer drinks" published</li>
        </ul>
      </section>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={{ background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 6px 18px rgba(15,23,36,0.05)" }}>
      <div style={{ color: "#64748b", fontSize: 13 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
