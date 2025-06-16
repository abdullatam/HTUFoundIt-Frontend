import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import HeaderSection from "../Components/HeaderSection";
import FooterSection from "../Components/FooterSection";

import "../CSS-Files/CSS-AvatarAPIPage.css";
import BuildingBG from "../assets/campuses-thumb.jpg"; 

const AVATARS = [
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Blake",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Theo",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Malik",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Ethan",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Grace",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=lisa",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=ron",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Zara",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Orion",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Leah",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Kaya",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Vera",
];

function AvatarPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [avatars, setAvatars] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setAvatars(AVATARS);
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return <div className="avatar-loading">Loading…</div>;
  }

  const handleConfirm = () => {
    if (!selected) return;
    localStorage.setItem("chosenAvatar", selected);
    navigate("/", { replace: true });
  };

  return (
    <div
      className="avatar-page"
      style={{
        backgroundImage: `url(${BuildingBG})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <HeaderSection />

      {isAuthenticated && (
        <div style={{ textAlign: "right", padding: "1rem" }}>
          <span style={{ marginRight: "1rem" }}>Welcome, {user.name}!</span>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            style={{
              background: "#c00",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Log Out
          </button>
        </div>
      )}

      <main className="avatar-card">
        <h1>Choose Your Avatar</h1>

        <div className="avatar-grid">
          {avatars.map((src) => (
            <button
              key={src}
              className={`avatar-btn ${
                selected === src ? "avatar-selected" : ""
              }`}
              onClick={() => setSelected(src)}
            >
              <img src={src} alt="avatar option" />
            </button>
          ))}
        </div>

        <button
          className="confirm-btn"
          disabled={!selected}
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </main>

      <FooterSection />
    </div>
  );
}

export default withAuthenticationRequired(AvatarPage, {
  onRedirecting: () => <div className="avatar-loading">Loading…</div>,
});
