import React, { useState, useEffect, useCallback } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Sidebar from "../Components/SideBarSection";
import AdminHeader from "../Components/AdminHeader";
import "../CSS-Files/CSS-AdminFoundItemsPage.css";

function AdminDeliveredItems() {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0();
  const [items, setItems] = useState([]);

  const rawApi = process.env.REACT_APP_API_URL || "http://localhost:3001";
  const API = rawApi.replace(/\/api\/?$/, "");

  const getImageUrl = useCallback((url) => {
    if (!url) return null;
    if (/^https?:\/\//.test(url)) return url;
    let pathPart = url.replace(/^\//, "");
    if (!pathPart.startsWith("uploads/")) pathPart = `uploads/${pathPart}`;
    return `${API}/${pathPart.split("/").map(encodeURIComponent).join("/")}`;
  }, [API]);

  const fetchItems = async () => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API}/api/found-items`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setItems(data.filter((i) => i.status === "delivered"));
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) fetchItems();
  }, [isLoading, isAuthenticated]);

  const handleStatusChange = async (id, newStatus) => {
    const token = await getAccessTokenSilently();
    await fetch(`${API}/api/found-items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (isLoading || !isAuthenticated) return <div>Loading…</div>;

  return (
    <div className="admin-panel">
      <Sidebar />
      <main className="dashboard-content">
        <AdminHeader />
        <h2>Delivered Found Items</h2>
        <div className="items-list">
          {items.map((it) => (
            <div key={it.id} className="found-card">
              {it.image_url && (
                <div className="found-thumb-wrapper">
                  <img
                    src={getImageUrl(it.image_url)}
                    alt={it.name}
                    className="found-thumb"
                  />
                </div>
              )}
              <div className="found-details">
                <h3>{it.name}</h3>
                <p>Category: {it.category}</p>
                <p>Place: {it.place}</p>
                <p>Date: {new Date(it.date_found).toLocaleDateString()}</p>
                <p>
                  Status:{" "}
                  <select
                    value={it.status}
                    onChange={(e) => handleStatusChange(it.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="matched">Matched</option>
                    <option value="delivered">Delivered</option>
                    <option value="archived">Archived</option>
                  </select>
                </p>
              </div>
            </div>
          ))}
          {items.length === 0 && <p>No delivered items.</p>}
        </div>
      </main>
    </div>
  );
}

export default withAuthenticationRequired(AdminDeliveredItems, {
  onRedirecting: () => <div>Loading…</div>,
});
