import React from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";


const NavigationBar = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/palm_heart.png" alt="CauseConnect Logo" />
        <span>CauseConnect</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/get-involved">Get Involved</Link></li>
        <li>
          <button onClick={handleSignInClick} className="sign-in-btn">
            Sign In
          </button>
          {/* <a href="/signin" className="sign-in-btn">
            Sign In
          </a> */}
        </li>
        <li>
          <Link to="/volunteer" className="volunteer-btn">Volunteer</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
