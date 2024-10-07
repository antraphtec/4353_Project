import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NAVBAR from "./components/NavBar.js";
import HERO from "./components/hero.js";
import Footer from "./components/footer.js";
import Login from "./components/login/login.jsx";
import ProfileManagement from "./components/profileManagement/profileManagementPage.jsx";
import VolunteerMatching from "./components/matching/matching.jsx";
import Registration from "./components/registration/registration.js";
import EventManagement from "./components/eventManagement/EventManagement.js";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://ucgkrnaqwrfaerbivysj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjZ2tybmFxd3JmYWVyYml2eXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxNjEyMjYsImV4cCI6MjA0MDczNzIyNn0.nWiEXSfP5fDOxEbyeFEGgfeSAzThobRl2HsxQf1yQZY"
);

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false); // Mark as done loading
    });

    // Listen for auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Show loading indicator while session is being checked
  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <NAVBAR session={session} supabase={supabase} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HERO />} />
        <Route path="/about" element={<HERO />} />
        <Route path="/get-involved" element={<HERO />} />

        {/* Protected Routes */}
        <Route
          path="/volunteer"
          element={session ? <VolunteerMatching /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={
            session ? (
              <ProfileManagement session={session} supabase={supabase} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/eventmanagement"
          element={
            session ? (
              <EventManagement session={session} supabase={supabase} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={
            !session ? <Login supabase={supabase} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/registration"
          element={
            !session ? (
              <Registration supabase={supabase} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
