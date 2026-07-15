import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const BookTable = () => {
  const { user, token, API_URL } = useAuth();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [totalPerson, setTotalPerson] = useState("1 Person");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Autofill name and phone if user is logged in
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!user) {
      navigate("/login");
      return;
    }

    if (!date || !time || !name || !phone || !totalPerson) {
      alert("Please fill in all fields first!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, phone, date, time, totalPerson })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to make reservation");
      }

      alert("Booked successfully!");
      navigate("/my-bookings");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="book-table-page text-center py-5">
        <div className="container py-5" style={{ maxWidth: 500 }}>
          <div className="card shadow p-5 border-0 rounded-4">
            <span style={{ fontSize: "4rem" }}>📅</span>
            <h2 className="mt-3 fw-bold">Reservation Required</h2>
            <p className="text-secondary mt-2">
              To book a table at Bistro Bliss, you must have an account. Please sign in or register to continue.
            </p>
            <button className="btn btn-dark rounded-pill mt-4 px-4 py-2" onClick={() => navigate("/login")}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-table-page">
      <div className="book-header">
        <h1>Book A Table</h1>
        <p>
          We consider all the drivers of change gives you the components
          you need to change to create a truly happens.
        </p>
      </div>

      <div className="book-form-container">
        {error && <div className="alert alert-danger" style={{ maxWidth: 800, margin: "0 auto 20px" }}>{error}</div>}
        <form className="book-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="x-xxxx-xxxx-xxxx" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Total Person</label>
            <select value={totalPerson} onChange={(e) => setTotalPerson(e.target.value)}>
              <option>1 Person</option>
              <option>2 People</option>
              <option>3 People</option>
              <option>4 People</option>
              <option>5+ People</option>
            </select>
          </div>

          <button type="submit" className="book-btn" disabled={loading}>
            {loading ? "Processing..." : "Book A Table"}
          </button>
        </form>
      </div>

      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.903167473759!2d-74.1637551!3d40.8530333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f6f4e6cd14df%3A0xbaa0ff7f40a99a9c!2sPassaic%2C%20NJ!5e0!3m2!1sen!2sus!4v1673900000000!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default BookTable;
