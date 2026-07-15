import React, { useState } from "react";

const sample = [
  { id: 1, title: "How to Cook the Perfect Steak", date: "Aug 10, 2025" },
  { id: 2, title: "10 Pasta Recipes", date: "Aug 5, 2025" },
];

export default function Posts() {
  const [posts, setPosts] = useState(sample);
  const [title, setTitle] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setPosts(p => [{ id: Date.now(), title, date: new Date().toLocaleDateString() }, ...p]);
    setTitle("");
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this post?")) return;
    setPosts(p => p.filter(x => x.id !== id));
  };

  return (
    <div>
      <h1>Manage Posts</h1>

      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New post title" className="form-control" />
        <button className="btn btn-dark">Add</button>
      </form>

      <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
        {posts.map(p => (
          <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: 10, borderBottom: "1px solid #eef2f7" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{p.title}</div>
              <div style={{ color: "#64748b", fontSize: 13 }}>{p.date}</div>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
