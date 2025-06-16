import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      console.error("Auth0 callback error:", error);
      return;
    }
    if (isAuthenticated && user) {
      // Custom claim namespace where you stored roles
      const namespace = "https://foundit.example.com/roles";
      const rolesArray = Array.isArray(user[namespace]) ? user[namespace] : [];

      if (rolesArray.includes("admin")) {
        // Admins go straight to their dashboard
        navigate("/admin/dashboard", { replace: true });
      } else {
        // STUDENTS now go to the Avatar‐Picker page
        navigate("/avatar", { replace: true }); // ← UPDATED
      }
    }
  }, [isLoading, isAuthenticated, user, error, navigate]);

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      Loading authentication…
    </div>
  );
}
