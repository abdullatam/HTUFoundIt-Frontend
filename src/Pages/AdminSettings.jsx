import React from "react";
import Sidebar from "../Components/SideBarSection";
import AdminHeader from "../Components/AdminHeader";
import FooterSection from "../Components/FooterSection";
import "../CSS-Files/CSS-AdminSettings.css";

const AdminSettings = () => {
  return (
    <div className="admin-settings-page">
      <Sidebar />
      <main className="settings-content">
        <AdminHeader />
        <div className="settings-card">
          <h2>Hi, Tamimi</h2>
          <p>22110423@htu.edu.jo</p>

          <form className="settings-form">
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" />

            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />

            <label>Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" />

            <button type="submit" className="update-button">Update</button>
          </form>

          <button className="logout-button">Log out</button>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
