// src/pages/SignUpPage.jsx

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import "../CSS-Files/CSS-SignUpPage.css"; // Your existing CSS
import HTUFounditLogo from "../assets/HTUFoundItLogo.png";
import BackgroundPhoto from "../assets/background-photo.png";
import FooterSection from "../Components/FooterSection";

export default function SignUpPage() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  // Show a simple loading message while Auth0 initializes
  if (isLoading) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        Loading authentication…
      </div>
    );
  }

  // If the user is already authenticated, show a “You’re already signed in” view
  if (isAuthenticated) {
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
        {/* HEADER */}
        <header className="signup-header">
          <div className="header-red-squares">
            <div className="square square-1" />
            <div className="square square-2" />
          </div>
          <img
            src={HTUFounditLogo}
            alt="HTU FoundIt"
            className="header-logo"
          />
        </header>

        {/* “Already Signed In” Message */}
        <main className="form-container">
          <div className="signup-form">
            <h2>You are already signed in as {user.name || user.email}</h2>
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin + "/signup" } })
              }
              className="submit-btn"
              style={{ width: "auto", marginTop: "1rem" }}
            >
              Log Out
            </button>
          </div>
        </main>

        {/* FOOTER */}
        <FooterSection />
      </div>
    );
  }

  // Normal state: show only the Auth0 “Sign Up” button
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
      {/* HEADER */}
      <header className="signup-header">
        <div className="header-red-squares">
          <div className="square square-1" />
          <div className="square square-2" />
        </div>
        <img
          src={HTUFounditLogo}
          alt="HTU FoundIt"
          className="header-logo"
        />
      </header>

      {/* AUTH0 BUTTON (no local form) */}
      <main className="form-container">
        <div className="signup-form">
          <h1>Sign Up to HTU FoundIt</h1>
          <button
            onClick={() =>
              loginWithRedirect({
                authorizationParams: { screen_hint: "signup" },
              })
            }
            className="auth0-signup-button"
          >
            Sign Up with Auth0
          </button>

          <p className="login-prompt" style={{ marginTop: "1rem" }}>
            Already have an account?{" "}
            <Link to="/login" className="signup-link">
              Log In
            </Link>
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <FooterSection />
    </div>
  );
}
