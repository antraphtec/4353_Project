import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = ({ session, supabase }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
        } else if (data && data.role === "admin") {
          setIsAdmin(true);
        }
      }
    };

    fetchUserRole();
  }, [session, supabase]);

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/registration");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/"); // Redirect to homepage after signing out
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/palm_heart.png" alt="CauseConnect Logo" />
        <span>CauseConnect</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/get-involved">Get Involved</Link>
        </li>

        {session ? (
          <>
            <li>
              <span>Welcome, {session.user.email}!</span>
            </li>
            {isAdmin && (
              <li>
                <Link to="/volunteer">Volunteer Matching</Link>
              </li>
            )}
            <li>
              <button onClick={handleSignOut} className="sign-out-btn">
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={handleSignInClick} className="sign-in-btn">
                Sign In
              </button>
            </li>
            <li>
              <button onClick={handleSignUpClick} className="sign-up-btn">
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
