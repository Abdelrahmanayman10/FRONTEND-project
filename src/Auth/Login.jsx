import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/";

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const user = await login(email, password);
      if (user.role === "admin") navigate("/admin", { replace: true });
      else navigate(from, { replace: true });
    } catch (error) {
      setErr(error.message || "Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don’t have an account? <Link to="/Register">Register</Link></p>
    </div>
  );
}


