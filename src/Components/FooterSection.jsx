import React from "react";
import "../CSS-Files/CSS-FooterSection.css";
import FooterLogo from "../assets/SET_Logo 1.png";
import IconPhone from "../assets/phone.png";
import IconLocation from "../assets/Location.png";
import IconEmail from "../assets/Email.png";

export const FooterSection = () => (
  <footer className="footer-section">
    <div className="footer-container">
      {/* Left column */}
      <div className="footer-left">
        <div className="footer-logo-text">
          <img src={FooterLogo} alt="HTU Logo" className="footer-logo" />
          <span className="footer-tagline">Future Starts Here</span>
        </div>

        <div className="footer-contacts">
          <div className="contact-item">
            <img src={IconPhone} alt="Phone" />
            <a href="tel:+96265808787">+962 6 580 8787</a>
          </div>
          <div className="contact-item">
            <img src={IconLocation} alt="Location" />
            <a href="https://maps.app.goo.gl/B343oUhjjG7wMhQN9" target="_blank" rel="noopener noreferrer">
              KHBP, Building 17, Amman – Jordan
            </a>
          </div>
          <div className="contact-item">
            <img src={IconEmail} alt="Email" />
            <a href="mailto:info@htu.edu.jo">info@htu.edu.jo</a>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="footer-right">
        Al-Hussein Technical University 2025 © All Rights Reserved
      </div>
    </div>
  </footer>
);

export default FooterSection;
