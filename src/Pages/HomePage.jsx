// src/pages/HomePage.jsx

import React, { useEffect, useState } from "react";           // ★ Combined React import ★
import { Link } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";  // ★ Added withAuthenticationRequired ★

import "../CSS-Files/CSS-HomePage.css";
/* — reusable layout bits — */
import HeaderSection from "../Components/HeaderSection";
import FooterSection from "../Components/FooterSection";
/* — assets — */
import BgNight   from "../assets/HTUW.jpg";
import LogoBig   from "../assets/HTUFoundItLogoMain.png";
import LostItems from "../assets/Lost-Items-Photo.png";
import RedLine   from "../assets/RedLine1.png";
import BagIcon   from "../assets/Bag.png";
/* ------------------------------------------------- */

function HomePage() {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0(); // ★ Added logout & isLoading ★

  
  if (isLoading) {
    return <div>Loading…</div>;
  }

  return (
    <div className="home-page">
      {/* 00. HEADER */}
      <HeaderSection />

      {/* Optional: show a welcome message + logout button */}
      {isAuthenticated && (
        <div style={{ textAlign: "right", padding: "1rem" }}>
  
        </div>
      )}

      {/* 01. HERO */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${BgNight})` }}
      >
        <div className="hero-overlay">
          <div className="hero-card">
            <img src={LogoBig} alt="HTU FoundIt" className="hero-logo" />
            <p className="hero-tagline">"Lost Something? HTU Found It."</p>
            <div className="hero-cta-container">
              <Link to="/post" className="hero-cta">
                Report Lost Item
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-silverBar"></div>
      </section>

      {/* 02. LOSING IS NORMAL / ICON GRID */}
      <section className="features-section">
        <div className="features-container">
          {/* left icons */}
          <div className="features-icons">
            <img src={LostItems} alt="Lost-item icons" />
          </div>

          {/* thin red bar (img so it scales perfectly) */}
          <img src={RedLine} alt="" className="features-line" />

          {/* heading + paragraph */}
          <div className="features-copy">
            <h2 className="two-line">
              Losing Something is Normal.
              Getting it Back is Possible.
            </h2>
            <p>
              We’ve all been there… the panic of realizing something is missing.
              HTU FoundIt is here to turn stress into relief. This platform was
              built to help students and staff reconnect with their belongings
              in a safe, secure, and organized way. Whether it’s a keychain, a
              backpack, or a simple ID, every report matters. Every return makes
              someone’s day easier. Together, we’re building a stronger
              community one lost item at a time.
            </p>
          </div>
          <div className="hero-silverBar" />
        </div>
      </section>

      {/* 03. HOW IT WORKS */}
      <section className="how-section">
        <div className="how-wrapper">
          <div className="how-bar" />

          <div className="how-text">
            <h3>How It Works?</h3>
            <ol>
              <li>Lost something on campus?</li>
              <li>Submit a detailed request with time, place, and description</li>
              <li>The Lost & Found team will check for a match and contact you</li>
            </ol>
          </div>

          <div className="how-art">
            <img src={BagIcon} alt="bag illustration" />
            {/* two decorative squares */}
            <span className="sq sq-top" />
            <span className="sq sq-btm" />
          </div>
        </div>
      </section>

      {/* 04. ABOUT (wallet version) */}
      <section className="aboutWallet-section">
        <div className="aboutWallet-wrap">
          {/* left illustration */}
          <div className="aboutWallet-art">
            <img
              src={require("../assets/WalletFewWords.png")}
              alt="wallet & magnifier"
            />
            {/* two small decorative squares */}
            <span className="aw-sq aw-sq-1" />
            <span className="aw-sq aw-sq-2" />
            <span className="aw-sq aw-sq-3" />
            <span className="aw-sq aw-sq-4" />
          </div>

          {/* heading + underline + paragraph */}
          <div className="aboutWallet-copy">
            <h3>
              Few words
              <br />
              about <span className="accent-red">HTU FoundIt</span>
            </h3>

            {/* hand-drawn underline */}
            <svg
              className="aw-underline"
              width="190"
              height="16"
              viewBox="0 0 190 16"
              fill="none"
            >
              <path
                d="M3 13 C60 -5 130 25 187 3"
                stroke="#000"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <p>
              HTUFOUNDIT is a student-led platform built to serve the HTU
              community by making it easier to report and recover lost items on
              campus. Designed with care and simplicity in mind, the system helps
              reduce stress, save time, and bring peace of mind to students who’ve
              misplaced something important. It’s safe, secure, and fully managed by
              the Lost & Found department but powered by the needs of students,
              for students.
            </p>
          </div>
        </div>
      </section>

      {/* 05. FOOTER */}
      <FooterSection />
    </div>
  );
}

// Protect HomePage so only authenticated users see it:
export default withAuthenticationRequired(HomePage, {
  onRedirecting: () => <div>Loading...</div>,
});
