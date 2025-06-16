import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export default function ProtectedRoute({ requiredRole }) {
  const { isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    // While Auth0 is initializing, show a simple loader
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) {
    // Not logged in at all → redirect to /login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    // Check for the custom roles claim on the ID token
    const namespace = "https://foundit.example.com/roles";
    const rolesArray = Array.isArray(user[namespace]) ? user[namespace] : [];

    // Normalize requiredRole to an array of strings
    const allowedRoles = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];

    // If user does not have any of the required roles, redirect to "/"
    const hasRole = allowedRoles.some((r) => rolesArray.includes(r));
    if (!hasRole) {
      return <Navigate to="/" replace />;
    }
  }

  // If authenticated (and authorized) → render the nested route(s)
  return <Outlet />;
}
