import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-top">
        <div className="footer-logo">
          <img src="/images/palm_heart.png" alt="CauseConnect Logo" />
          <h1>CauseConnect</h1>
        </div>
        <p className="footer-description">
          To bring the world together on one common cause; to save the world from pollution and assist in a brighter tomorrow!
        </p>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h2>Contact Us</h2>
          <p className="footer-white-text">causeconnect@gmail.com</p>
          <p className="footer-white-text">+281 228 7300</p>
        </div>
        <div className="footer-column">
          <h2>Quick Links</h2>
          <Link to="/about-us">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/get-involved">Get Involved</Link>
          <Link to="/team">Team</Link>
        </div>
        <div className="footer-column">
          <h2>Working Hours</h2>
          <p className="footer-white-text">Monday - Friday: 8:00am to 5:00pm</p>
          <p className="footer-white-text">Saturday - Sunday: 8:00am to 3:00pm</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
