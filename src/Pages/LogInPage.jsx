// src/pages/LogInPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// NOTE: adjust the paths below if your folder structure is different.
import "../CSS-Files/CSS-LogInPage.css";
import HTUFounditLogo from "../assets/HTUFoundItLogo.png";
import BackgroundPhoto from "../assets/background-photo.png";
import FooterSection from "../Components/FooterSection";

export default function LogInPage() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  // While Auth0 is initializing, show a loader
  if (isLoading) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        Loading…
      </div>
    );
  }

  // If already authenticated, show a “you’re already logged in” view with a Log Out button
  if (isAuthenticated) {
    return (
      <div className="login-page" style={{ fontFamily: "Arial, sans-serif" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>You are already logged in as {user.name || user.email}</h2>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin + "/login" } })
            }
            className="submit-btn"
            style={{ width: "auto", margin: "1rem auto" }}
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  // Default: show the styled login page with Auth0 button
  return (
    <div
      className="sign-up-page"
      style={{
        backgroundImage: `url(${BackgroundPhoto})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      {/* ─── HEADER ────────────────────────────────────────────────────────────────── */}
      <header className="signup-header">
        <div className="header-red-squares">
          <div className="square square-1" />
          <div className="square square-2" />
        </div>
        <img
          src={HTUFounditLogo}
          alt="HTU FoundIt Logo"
          className="header-logo"
        />
      </header>

      {/* ─── LOGIN FORM ────────────────────────────────────────────────────────────── */}
      <main className="form-container">
        <div className="login-form">
          <h1 className="form-title">Log In to HTU FoundIt</h1>

          <button
            onClick={() => loginWithRedirect()}
            className="submit-btn"
          >
            Log In with Auth0
          </button>

          <p className="login-prompt">
            Don’t have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </main>

      {/* ─── FOOTER ────────────────────────────────────────────────────────────────── */}
      <div style={{ marginTop: "125px", width: "100%", position: "relative" }}>
        <FooterSection />
      </div>
    </div>
  );
}
