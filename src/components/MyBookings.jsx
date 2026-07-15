import React, { useState, useEffect } from "react";
import { useAuth } from "../Auth/AuthContext";
import { Link } from "react-router-dom";

export default function MyBookings() {
  const { token, API_URL } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/bookings/my-bookings`, {
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

    fetchBookings();
  }, [token, API_URL]);

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
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: "#4d5c52" }}>My Table Bookings</h2>
        <Link to="/book-table" className="btn btn-dark rounded-pill px-4">
          Book Another Table
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : bookings.length === 0 ? (
        <div className="card shadow-sm border-0 rounded-4 p-5 text-center">
          <span style={{ fontSize: "3rem" }}>🍽️</span>
          <h4 className="mt-3 fw-semibold">No bookings found</h4>
          <p className="text-secondary mt-1">You haven't made any restaurant reservations yet.</p>
          <Link to="/book-table" className="btn btn-dark rounded-pill mt-3 px-4">
            Book Now
          </Link>
        </div>
      ) : (
        <div className="card shadow border-0 rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-secondary" style={{ fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  <th className="px-4 py-3">Reservation ID</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Phone</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Time</th>
                  <th className="py-3 text-center">Guests</th>
                  <th className="py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} style={{ borderBottom: "1px solid #eef2f7" }}>
                    <td className="px-4 py-3 font-monospace text-secondary" style={{ fontSize: "0.9rem" }}>
                      {booking._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-3 fw-semibold">{booking.name}</td>
                    <td className="py-3">{booking.phone}</td>
                    <td className="py-3">{booking.date}</td>
                    <td className="py-3">{booking.time}</td>
                    <td className="py-3 text-center">{booking.totalPerson}</td>
                    <td className="py-3 text-center">
                      <span className={`badge rounded-pill px-3 py-1.5 fw-semibold text-capitalize ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status}
                      </span>
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
