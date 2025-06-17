import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import HomePage from "./Pages/HomePage";
import LogInPage from "./Pages/LogInPage";
import SignUpPage from "./Pages/SignUpPage";
import PostPage from "./Pages/PostPage";
import AvatarAPIPage from "./Pages/AvatarAPIPage";

import AdminDashboard from "./Pages/AdminDashboard";
import AdminFoundItemsPage from "./Pages/AdminFoundItemsPage";
import AdminArchivedItems from "./Pages/AdminArchivedItems";
import AdminDeliveredItems from "./Pages/AdminDeliveredItems";
import AdminMatchedItems from "./Pages/AdminMatchedItems";
import AdminRecentRequests from "./Pages/AdminRecentRequests";
import AdminSettings from "./Pages/AdminSettings";

import Callback from "./Auth/Callback";
import ProtectedRoute from "./Auth/ProtectedRoute";
import NotFound from "./Components/NotFound"; 
import SubmitSuccessPage from "./Pages/SubmitSuccessPage";



function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        Loading authentication…
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/auth/callback" element={<Callback />} />

        <Route element={<ProtectedRoute requiredRole="student" />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/avatar" element={<AvatarAPIPage />} />
          <Route path="/submit-success" element={<SubmitSuccessPage />} />

        </Route>

        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/found-items" element={<AdminFoundItemsPage />} />
          <Route path="/admin/archived-items" element={<AdminArchivedItems />} />
          <Route path="/admin/delivered-items" element={<AdminDeliveredItems />} />
          <Route path="/admin/matched-items" element={<AdminMatchedItems />} />
          <Route path="/admin/recent-requests" element={<AdminRecentRequests />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;


