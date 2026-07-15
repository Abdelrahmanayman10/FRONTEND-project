import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function AdminMenu() {
  const { token, API_URL } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form states
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [description, setDescription] = useState("");
  
  const [formError, setFormError] = useState("");

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${API_URL}/menu`);
      if (!response.ok) {
        throw new Error("Failed to fetch menu");
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (err) {
      setError(err.message || "Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [API_URL]);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setImg("");
    setCategory("Breakfast");
    setDescription("");
    setFormError("");
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setPrice(item.price.toString());
    setImg(item.img);
    setCategory(item.category);
    setDescription(item.description || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!name || !price || !img || !category) {
      setFormError("Please fill in all required fields");
      return;
    }

    const payload = {
      name,
      price: parseFloat(price),
      img,
      category,
      description
    };

    try {
      let response;
      if (editingId) {
        response = await fetch(`${API_URL}/menu/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(`${API_URL}/menu`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save menu item");
      }

      alert(editingId ? "Menu item updated successfully!" : "Menu item added successfully!");
      resetForm();
      fetchMenu();
    } catch (err) {
      setFormError(err.message || "Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;
    try {
      const response = await fetch(`${API_URL}/menu/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete menu item");
      }
      setMenuItems(m => m.filter(x => x._id !== id));
      alert("Menu item deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 className="fw-bold mb-4" style={{ color: "#0f1724" }}>Manage Menu Items</h1>

      <div className="row g-4">
        {/* Form Column */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 rounded-4 p-4" style={{ background: "#fff" }}>
            <h4 className="fw-bold mb-3" style={{ color: "#4d5c52" }}>
              {editingId ? "Edit Menu Item" : "Add Menu Item"}
            </h4>

            {formError && <div className="alert alert-danger py-2 small">{formError}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Item Name *</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Pepperoni Pizza"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control rounded-3"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g., 14.99"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Image URL or Asset Path *</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  placeholder="e.g., /src/assets/food111.jpg"
                  required
                />
                <div className="form-text small">Use absolute URLs or frontend local asset paths (e.g. `/src/assets/food111.jpg`).</div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Category *</label>
                <select
                  className="form-select rounded-3"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Main Dishes">Main Dishes</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Description</label>
                <textarea
                  className="form-control rounded-3"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the dish ingredients, preparation, etc."
                ></textarea>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button type="submit" className="btn btn-dark w-100 rounded-pill py-2 fw-semibold">
                  {editingId ? "Save Changes" : "Add Item"}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-outline-secondary rounded-pill px-3" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="col-lg-8">
          {loading ? (
            <div>Loading menu...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : menuItems.length === 0 ? (
            <div className="card text-center p-5 border-0 shadow-sm" style={{ background: "#fff" }}>
              <h4>No menu items found</h4>
              <p className="text-secondary">Please add menu items or run database seed script.</p>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
              <div className="table-responsive">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ background: "#f1f5f9" }}>
                    <tr>
                      <th style={th}>Preview</th>
                      <th style={th}>Name</th>
                      <th style={th}>Category</th>
                      <th style={th}>Price</th>
                      <th style={th} className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map(item => (
                      <tr key={item._id}>
                        <td style={td}>
                          <img
                            src={item.img}
                            alt={item.name}
                            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=80&h=80&q=80";
                            }}
                          />
                        </td>
                        <td style={td} className="fw-semibold">{item.name}</td>
                        <td style={td}>
                          <span className="badge rounded-pill bg-light text-dark border px-2.5 py-1">
                            {item.category}
                          </span>
                        </td>
                        <td style={td} className="fw-semibold">${item.price.toFixed(2)}</td>
                        <td style={td} className="text-end">
                          <button
                            className="btn btn-sm btn-outline-primary me-2 rounded-3"
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-3"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const th = { textAlign: "left", padding: "14px 18px", fontSize: 13, color: "#475569", fontWeight: 700 };
const td = { padding: "14px 18px", borderTop: "1px solid #eef2f7", fontSize: 14, verticalAlign: "middle" };
