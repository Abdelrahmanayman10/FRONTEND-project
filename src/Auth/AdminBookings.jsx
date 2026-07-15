import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function AdminBookings() {
  const { token, API_URL } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token, API_URL]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update booking status");
      }
      setBookings(b => b.map(x => x._id === id ? { ...x, status: data.status } : x));
      alert(`Booking ${status} successfully!`);
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "accepted":
        return "bg-success-subtle text-success border border-success-subtle";
      case "rejected":
        return "bg-danger-subtle text-danger border border-danger-subtle";
      default:
        return "bg-warning-subtle text-warning-emphasis border border-warning-subtle";
    }
  };

  return (
    <div>
      <h1 className="fw-bold mb-4" style={{ color: "#0f1724" }}>Manage Reservations</h1>

      {loading ? (
        <div>Loading bookings...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : bookings.length === 0 ? (
        <div className="card text-center p-5 border-0 shadow-sm" style={{ background: "#fff" }}>
          <h4>No reservations found</h4>
          <p className="text-secondary">When customers book tables, they will show up here.</p>
        </div>
      ) : (
        <div style={{ marginTop: 12, background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          <div className="table-responsive">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#f1f5f9" }}>
                <tr>
                  <th style={th}>Booking ID</th>
                  <th style={th}>User Email</th>
                  <th style={th}>Guest Name</th>
                  <th style={th}>Phone</th>
                  <th style={th}>Date</th>
                  <th style={th}>Time</th>
                  <th style={th} className="text-center">Guests</th>
                  <th style={th} className="text-center">Status</th>
                  <th style={th} className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id}>
                    <td style={td} className="font-monospace text-secondary">{b._id.slice(-8).toUpperCase()}</td>
                    <td style={td}>{b.user?.email || "Unknown"}</td>
                    <td style={td} className="fw-semibold">{b.name}</td>
                    <td style={td}>{b.phone}</td>
                    <td style={td}>{b.date}</td>
                    <td style={td}>{b.time}</td>
                    <td style={td} className="text-center">{b.totalPerson}</td>
                    <td style={td} className="text-center">
                      <span className={`badge rounded-pill px-2.5 py-1.5 text-capitalize ${getStatusBadgeClass(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td style={td} className="text-center">
                      {b.status === "pending" ? (
                        <div className="d-flex gap-1 justify-content-center">
                          <button
                            className="btn btn-sm btn-success rounded-3 px-2.5"
                            onClick={() => handleUpdateStatus(b._id, "accepted")}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-sm btn-danger rounded-3 px-2.5"
                            onClick={() => handleUpdateStatus(b._id, "rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-secondary rounded-3 px-2.5"
                          onClick={() => handleUpdateStatus(b._id, "pending")}
                        >
                          Reset to Pending
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const th = { textAlign: "left", padding: "14px 18px", fontSize: 13, color: "#475569", fontWeight: 700 };
const td = { padding: "14px 18px", borderTop: "1px solid #eef2f7", fontSize: 14 };
