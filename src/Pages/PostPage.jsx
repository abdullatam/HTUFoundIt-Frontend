// src/pages/PostPage.jsx
import React, { useState, useEffect } from "react";
import "../CSS-Files/CSS-PostPage.css";
import HeaderSection from "../Components/HeaderSection";
import FooterSection from "../Components/FooterSection";
import BgNight from "../assets/htu-buildings.jpeg";
import { createLostItem } from "../api"; 
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"; 

export function PostPage() {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0(); // ★ Added Auth0 hooks ★

  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    const chosen = localStorage.getItem("chosenAvatar") || "";
    setAvatarUrl(chosen);
  }, []);



  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(selectedFile.type)) {
      alert('Please select a valid image file (JPG, PNG, GIF, or WebP)');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      const formData = new FormData();
      
      console.log('User ID being sent:', user.sub);
      
      formData.append('name', itemName);
      formData.append('category', category);
      formData.append('place', place);
      formData.append('date_lost', dateLost);
      formData.append('description', description);
      formData.append('mobile', mobile);
      formData.append('posted_by', user.sub); // This should now work with text type
      formData.append('avatar_url', avatarUrl);

      if (file) {
        formData.append('image', file);
      }

      const response = await fetch(`http://localhost:3001/api/lost-items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit post');
      }

      alert('Your lost-item has been submitted successfully!');
      // Reset form
      setCategory("");
      setPlace("");
      setDateLost("");
      setItemName("");
      setDescription("");
      setMobile("");
      setFile(null);
      setImagePreview(null);

    } catch (err) {
      console.error('Error:', err);
      alert("Error submitting lost-item: " + err.message);
    }
  };

  return (
    <div className="post-page">
      <HeaderSection />

      {isAuthenticated && (
        <div style={{ textAlign: "right", margin: "1rem" }}>
          
        </div>
      )}

      <section
        className="lost-hero"
        style={{ backgroundImage: `url(${BgNight})`, backgroundSize: "cover" }}
      >
        <div className="lost-overlay">
          <form className="lost-card" onSubmit={handleSubmit}>
            <h1 className="lost-title">“Make a Post – Lost Something?”</h1>
            <p className="lost-sub">
              Fill out the form below so we can match your lost item faster.
            </p>

            <div className="lost-row">
              <select
                className="lost-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  🔻 Category
                </option>
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
              </select>

              <select
                className="lost-select"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
              >
                <option value="" disabled>
                  📍 Place
                </option>
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
              </select>

              <input
                type="date"
                className="lost-date"
                value={dateLost}
                onChange={(e) => setDateLost(e.target.value)}
                required
              />
            </div>

            <label className="lost-label">Item Name:</label>
            <input
              className="lost-input"
              placeholder="ex: HP Laptop Charger"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />

            <label className="lost-label">Description:</label>
            <textarea
              className="lost-textarea"
              placeholder="ex: I lost my black backpack near the cafeteria at 1 P.M…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label className="lost-file-wrapper">
              <span className="lost-file-btn"> Choose Photo</span>
              <span className="lost-file-text">
                {imagePreview ? "1 file selected" : "No file chosen"}
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
            </label>

            {imagePreview && (
              <div className="lost-preview">
                <img src={imagePreview} alt="preview" />
              </div>
            )}

            <label className="lost-label">Your Mobile #:</label>
            <input
              className="lost-input"
              type="tel"
              placeholder="0791234567"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />

            <button type="submit" className="lost-submit">
              Submit Post
            </button>
          </form>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

export default withAuthenticationRequired(PostPage, {
  onRedirecting: () => <div>Loading…</div>,
});
