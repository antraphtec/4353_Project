import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Logo and description */}
        <div className="footer-logo">
          <img src="/images/palm_heart.png" alt="CauseConnect Logo" />
          <h1>CauseConnect</h1>
          <p>To bring the world together on one common cause; to save the world from pollution and assist in a brighter tomorrow!</p>
        </div>

        {/* Contact Us */}
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>causeconnect@gmail.com</p>
          <p>+281 228 7300</p>
          <div className="social-icons">
            <a href="/" className="social-icon-link" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="/" className="social-icon-link" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter" />
            </a>
            <a href="/" className="social-icon-link" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram" />
            </a>
            <a href="/" className="social-icon-link" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h2>Quick Links</h2>
          <p><a href="#">About Us</a></p>
          <p><a href="#">Services</a></p>
          <p><a href="#">Get Involved</a></p>
          <p><a href="#">Team</a></p>
        </div>

        {/* Working Hours */}
        <div className="footer-section">
          <h2>Working Hours</h2>
          <p>Monday - Friday: 8:00am to 5:00pm</p>
          <p>Saturday - Sunday: 8:00am to 3:00pm</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
