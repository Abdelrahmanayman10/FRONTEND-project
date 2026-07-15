import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireRole({ children, role }) {
  const { user } = useAuth();
  if (!user || user.role !== role) return <Navigate to="/403" replace />;
  return children;
}
