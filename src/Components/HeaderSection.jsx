import React from "react";
import "../CSS-Files/CSS-HeaderSection.css";
import HTUFounditLogo from "../assets/HTUFoundItLogo.png";

function HeaderSection() {
  return (
    <header className="header-section">
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
  );
}

// export AFTER the function is declared
export default HeaderSection;
