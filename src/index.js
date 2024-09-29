import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NAVBAR from "./components/NavBar.js";
import HERO from "./components/hero.js";
import Footer from "./components/footer.js";
import Login from "./components/login/login.jsx";
import ProfileManagement from "./components/profileManagement/profileManagementPage.jsx";
import VolunteerMatching from "./components/matching/matching.jsx";
import Registration from "./components/registration/registration.js";
import EventManagement from "./components/eventManagement/EventManagement.js";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

// Initialize Supabase client
const supabase = createClient(
  "https://ucgkrnaqwrfaerbivysj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjZ2tybmFxd3JmYWVyYml2eXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxNjEyMjYsImV4cCI6MjA0MDczNzIyNn0.nWiEXSfP5fDOxEbyeFEGgfeSAzThobRl2HsxQf1yQZY"
);

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen to auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Show login form if not authenticated
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }

  // Show the app if authenticated
  return (
    <Router>
      <NAVBAR />
      <Routes>
        <Route path="/" element={<HERO />} />
        <Route path="/about" element={<HERO />} />
        <Route path="/get-involved" element={<HERO />} />
        <Route path="/volunteer" element={<div>Volunteer Page</div>} />
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/matching" element={<VolunteerMatching />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/eventmanagement" element={<EventManagement />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
