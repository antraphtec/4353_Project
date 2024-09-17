import React from "react";
import "./NavBar.css";

const NavigationBar = ({ handleSignInClick }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/palm_heart.png" alt="CauseConnect Logo" />
        <span>CauseConnect</span>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/get-involved">Get Involved</a></li>
        <li>
          <button onClick={handleSignInClick} className="sign-in-btn">
            Sign In
          </button>
          {/* <a href="/signin" className="sign-in-btn">
            Sign In
          </a> */}
        </li>
        <li>
          <a href="/volunteer" className="volunteer-btn">
            Volunteer
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
