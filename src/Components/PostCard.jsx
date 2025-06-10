import React, { useState, useCallback, useEffect } from "react";
import "../CSS-Files/CSS-PostCard.css";
import DefaultAvatar from "../assets/avatar.png";
import { useAuth0 } from "@auth0/auth0-react";

export default function PostCard({ item, onDelete }) {
  const { getAccessTokenSilently } = useAuth0();
  const rawApi = process.env.REACT_APP_API_URL || "http://localhost:3001";
  const API = rawApi.replace(/\/api\/?$/, "");

  const {
    id,
    name,
    category,
    place,
    date_lost,
    image_url,
    description = "",
    posted_by,
    avatar_url = "",
    mobile
  } = item || {};

  // Helper to build image URL
  const getImageUrl = useCallback((url) => {
    if (!url) return null;
    // If it's a full URL, return it
    if (/^https?:\/\//.test(url)) return url;
    // Determine path part: if url already starts with /uploads
    let pathPart = url.replace(/^\//, "");
    if (!pathPart.startsWith("uploads/")) {
      pathPart = `uploads/${pathPart}`;
    }
    // URL-encode filename
    const segments = pathPart.split("/").map(encodeURIComponent);
    return `${API}/${segments.join("/")}`;
  }, [API]);

  // Delete handler
  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`${API}/api/lost-items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Delete failed");
      if (onDelete) onDelete(id);
      else window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Could not delete: " + err.message);
    }
  };

  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(false); }, [image_url]);

  const formatDate = (d) => {
    try {
      return new Date(d).toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' });
    } catch {
      return d;
    }
  };

  if (!item) return null;

  const srcAvatar = avatar_url ? getImageUrl(avatar_url) : DefaultAvatar;
  const srcImage = image_url ? getImageUrl(image_url) : null;

  return (
    <div className="post-container">
      <button className="delete-btn" onClick={handleDelete}>Delete</button>
      <div className="post-header">
        <img src={srcAvatar} alt={posted_by} className="user-avatar" onError={e => e.target.src = DefaultAvatar} />
        <div>
          <h3>{posted_by}</h3>
          <p>{formatDate(date_lost)}</p>
        </div>
      </div>

      <h2 className="post-title">{name}</h2>
      <p className="post-description">{description}</p>

      {srcImage && (
        <div className="post-image-container">
          {!loaded && <div className="loading-spinner">Loading...</div>}
          <img
            src={srcImage}
            alt={name}
            className="post-image"
            onLoad={() => setLoaded(true)}
            onError={e => { console.error('Image load error:', e.target.src); setLoaded(true); e.target.style.display='none'; }}
          />
        </div>
      )}

      <div className="post-footer">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Place:</strong> {place}</p>
        <p><strong>Date:</strong> {date_lost}</p>

      </div>
    </div>
  );
}
 