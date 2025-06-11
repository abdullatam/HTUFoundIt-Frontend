import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"; // ★ Added Auth0 imports ★
import FooterSection from "../Components/FooterSection";
import Sidebar from "../Components/SideBarSection";
import AdminHeader from "../Components/AdminHeader";
import "../CSS-Files/CSS-AdminDashboard.css";

const AdminPanel = () => {
  const { user, isLoading, isAuthenticated, logout } = useAuth0(); // ★ Added Auth0 hooks ★

  if (isLoading) {
    return <div>Loading…</div>;
  }

  return (
        <div className="admin-panel">
      <Sidebar />
      <main className="dashboard-content">
        <AdminHeader />
    <div className="dashboard-header">
          <h1>HTU Lost & Found Management Center</h1>
          <p>Welcome to your Admin Panel, where you control every step of the lost-and-found process.</p>
          <p>Navigate the menu on the left to review reports, log new items, manage matches, and update settings.</p>
        </div>

        <div className="categories-section">
          <div className="categories">
            <h3>All Categories</h3>
            <ul>
              <li> Devices</li>
              <li> Watches</li>
              <li> Laptop Charger</li>
              <li> Keys</li>
              <li> Glasses</li>
              <li> Wallet</li>
              <li> Jacket</li>
              <li> Notebook</li>
            </ul>
          </div>

          <div className="matched-requests">
            <div className="number-display">23</div>
            <p>Total Matched Request</p>
          </div>
        </div>
      </main>
    </div>
  );
};


export default withAuthenticationRequired(AdminPanel, {
  onRedirecting: () => <div>Loading…</div>,
});
