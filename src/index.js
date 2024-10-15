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
import Footer from "./components/footer.jsx";
import Login from "./components/login/login.jsx";
import ProfileManagement from "./components/profileManagement/profileManagementPage.jsx";
import VolunteerMatching from "./components/matching/matching.jsx";
import Registration from "./components/registration/registration.js";
import EventManagement from "./components/eventManagement/EventManagement.js";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to fetch user role
  const fetchUserRole = async (email) => {
    try {
      const { data, error } = await supabase
        .from("accounts")
        .select("role")
        .eq("email_address", email) // Use email_address to find the user
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
      } else if (data && data.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Unexpected error fetching user role:", error);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false); // Mark as done loading
      if (session) {
        fetchUserRole(session.user.email); // Fetch user role
      }
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          fetchUserRole(session.user.email);
        } else {
          setIsAdmin(false); // Reset admin status when not logged in
        }
      }
    );

    // Properly unsubscribe when the component unmounts
    return () => {
      authListener?.unsubscribe();
    };
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
          path="/profile"
          element={
            session ? (
              <ProfileManagement session={session} supabase={supabase} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

{/*
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
*/}

<Route
  path="/eventmanagement"
  element={<EventManagement supabase={supabase} />}
/>
{/*
        <Route
          path="/volunteer"
          element={
            session ? (
              <VolunteerMatching supabase={supabase} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
*/}

<Route
  path="/volunteer"
  element={<VolunteerMatching supabase={supabase} />}
/>

        {/* Admin Route */}
  
        {/* <Route
          path="/admin"
          element={
            session ? (
              isAdmin ? (
                <AdminDashboard supabase={supabase} />
              ) : (
                <Navigate to="/volunteer" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}

      <Route
        path="/admin"
        element={<AdminDashboard supabase={supabase} />}
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
            !session ? <Registration supabase={supabase} /> : <Navigate to="/" />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);