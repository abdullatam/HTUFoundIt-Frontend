import React, { useState, useEffect, useCallback } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Components/SideBarSection";
import AdminHeader from "../Components/AdminHeader";
import "../CSS-Files/CSS-AdminFoundItemsPage.css";

function AdminFoundItemsPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0();
  const [items, setItems]       = useState([]);
  const [showForm, setShowForm] = useState(false);

  // form state
  const [name, setName]           = useState("");
  const [category, setCategory]   = useState("");
  const [place, setPlace]         = useState("");
  const [dateFound, setDateFound] = useState("");
  const [file, setFile]           = useState(null);
  const [preview, setPreview]     = useState(null);

  // Normalize API URL
  const rawApi = process.env.REACT_APP_API_URL || "http://localhost:3001";
  const API    = rawApi.replace(/\/api\/?$/, "");

  // fetch items
  const fetchItems = async () => {
    try {
      const res = await fetch(`${API}/api/found-items`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch found items:", err);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) fetchItems();
  }, [isLoading, isAuthenticated]);

  // build image URL
  const getImageUrl = useCallback(
    (url) => {
      if (!url) return null;
      if (/^https?:\/\//.test(url)) return url;
      let pathPart = url.replace(/^\//, "");
      if (!pathPart.startsWith("uploads/")) pathPart = `uploads/${pathPart}`;
      return `${API}/${pathPart.split("/").map(encodeURIComponent).join("/")}`;
    },
    [API]
  );

  // preview file
  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please choose a photo");
    try {
      const token = await getAccessTokenSilently();
      const fd = new FormData();
      fd.append("name",        name);
      fd.append("category",    category);
      fd.append("place",       place);
      fd.append("date_found",  dateFound);
      fd.append("status",      "pending"); // Hardcode status as pending
      fd.append("submitted_by", user.sub);
      fd.append("image",       file);

      const res = await fetch(`${API}/api/found-items`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || res.statusText);

      // reset & reload
      setShowForm(false);
      setName(""); setCategory(""); setPlace(""); setDateFound("");
      setFile(null); setPreview(null);
      fetchItems();
    } catch (err) {
      console.error("Failed to add found item:", err);
      alert("Failed to add found item: " + err.message);
    }
  };

  // handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`${API}/api/found-items/${id}`, {
        method: "PUT", // use PUT to match your backend
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errMsg = errorData.error || errorData.message || res.statusText;
        throw new Error(errMsg);
      }

      // refresh list so this item disappears from Pending
      await fetchItems();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  if (isLoading || !isAuthenticated) return <div>Loading…</div>;

  return (
    <div className="admin-panel">
      <Sidebar />
      <main className="dashboard-content">
        <AdminHeader />    

        <h2 className="page-title">Found Items Management (Pending)</h2>
        <button className="add-button" onClick={() => setShowForm(f => !f)}>
          + Add Found Item
        </button>

        {showForm && (
          <form className="found-form" onSubmit={handleSubmit}>
            <input
              className="form-input"
              type="text"
              placeholder="Item Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <select
              className="form-input"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              <option value="">Category</option>
               <option>Electronics</option>
                <option>Clothing</option>
                <option>Books</option>
                <option>Chargers</option>
                <option>Keys</option>
                <option>Wallets</option>
                <option>Glasses</option>
                <option>Cards</option>
                <option>Basement Lockers</option>
                <option>Money</option>
                <option>Others</option>
              {/* ... */}
            </select>
            <select
              className="form-input"
              value={place}
              onChange={e => setPlace(e.target.value)}
              required
            >
              <option value="">Place</option>
               <option>New Soft</option>
                <option>Orange Village</option>
                <option>HTU Square</option>
                <option>N (Blue Building)</option>
                <option>S (Red Building)</option>
                <option>W (Old Building)</option>
                <option>Workshops</option>
                <option>Iman‐Building</option>
                <option>Library</option>
                <option>HTU Theater</option>
                <option>Others</option>
              {/* ... */}
            </select>
            <input
              className="form-input"
              type="date"
              value={dateFound}
              onChange={e => setDateFound(e.target.value)}
              required
            />

            <label className="file-label">
              Photo:
              <input
                className="form-file"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFile}
                required
              />
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="preview-thumb"
              />
            )}

            <button type="submit" className="save-button">
              Save Found Item
            </button>
          </form>
        )}

        <div className="items-list">
          {items
            .filter(item => item.status === 'pending')
            .map(it => (
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
                  <p>
                    Date:{" "}
                    {new Date(it.date_found).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
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
        </div>
      </main>
    </div>
  );
}

export default withAuthenticationRequired(AdminFoundItemsPage, {
  onRedirecting: () => <div>Loading…</div>,
});
