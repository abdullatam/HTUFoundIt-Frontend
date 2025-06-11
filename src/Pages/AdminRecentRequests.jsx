import React, { useEffect, useState } from "react";
import Sidebar from "../Components/SideBarSection";
import AdminHeader from "../Components/AdminHeader";
import SearchFilterSection from "../Components/SearchFilterSection";
import PostCard from "../Components/PostCard";       
import { fetchLostItems } from "../api";
import "../CSS-Files/CSS-AdminRecentRequests.css";

export default function AdminRecentRequests() {
  const [items, setItems] = useState([]);           
  const [loading, setLoading] = useState(true);     
  const [error, setError] = useState("");        

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchLostItems();
        console.log("✔️ fetchLostItems returned:", data);
        setItems(data);
      } catch (err) {
        console.error("❌ fetchLostItems error:", err);
        setError("Failed to load recent requests.");
      } finally {
        setLoading(false);
      }
    })();
  }, []); 

  return (
    <div className="admin-panel">
      <Sidebar />

      <main className="dashboard-content">
        <AdminHeader />

        <SearchFilterSection />

        <section className="recent-requests">
          <h2>Recent Lost-Item Requests</h2>

          {loading && <p>Loading requests…</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && items.length === 0 && (
            <p>No requests have been posted yet.</p>
          )}

          <div className="post-list">
            {!loading &&
              !error &&
              items.map((item) => (
                <React.Fragment key={item.id}>
                  {PostCard ? (
                    <PostCard item={item} />
                  ) : (
                    <pre>{JSON.stringify(item, null, 2)}</pre>
                  )}
                </React.Fragment>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
