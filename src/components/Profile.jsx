import React, { useState } from "react";
import { useAuth } from "../Auth/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const updateData = { name, email, phone, address };
      if (password) {
        updateData.password = password;
      }
      await updateProfile(updateData);
      setMessage("Profile updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0 rounded-4 p-4">
            <h2 className="mb-4 text-center fw-bold" style={{ color: "#4d5c52" }}>
              My Profile
            </h2>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  type="tel"
                  className="form-control rounded-3"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Delivery Address</label>
                <textarea
                  className="form-control rounded-3"
                  rows="3"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              <hr className="my-4" />
              <h5 className="mb-3 text-secondary">Change Password (Optional)</h5>

              <div className="mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <input
                  type="password"
                  className="form-control rounded-3"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control rounded-3"
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100 rounded-pill py-2.5 mt-3 fw-semibold"
                disabled={loading}
              >
                {loading ? "Saving Changes..." : "Save Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
