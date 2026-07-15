import React, { useState } from "react";

export default function Settings() {
  const [siteName, setSiteName] = useState("Bistro Bliss");
  const [currency, setCurrency] = useState("EGP");

  const save = (e) => {
    e.preventDefault();
    alert("Saved (mock)");
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={save} style={{ marginTop: 12, background: "#fff", padding: 12, borderRadius: 8 }}>
        <div className="mb-3">
          <label className="form-label">Site name</label>
          <input className="form-control" value={siteName} onChange={e => setSiteName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Currency</label>
          <input className="form-control" value={currency} onChange={e => setCurrency(e.target.value)} />
        </div>
        <button className="btn btn-dark">Save</button>
      </form>
    </div>
  );
}
