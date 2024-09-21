import React, { useState } from "react";
import "./registration.css";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phonePattern.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const userData = {
      name,
      email,
      phone,
      password,
    };

    console.log(userData);
    alert("Registration Successful!");
  };

  return (
    <div className="registration-form-container">
      <div className="image-section">
        <img
          src="/images/palm_earth_full.png"
          alt="Hand holding the Earth"
          className="palm-earth"
        />
      </div>

      <div className="form-section">
        {/* Back to Home button */}
        <button className="back-link" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <h1>Be a Changemaker: Volunteer with Us</h1>
        <p>Get started by making an account with us!</p>

        <form className="registration-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="8023456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"} // Conditionally change input type
            id="password"
            name="password"
            placeholder="Enter a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Show Password Checkbox */}
          <div className="show-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show password</label>
          </div>

          <button type="submit">Volunteer Now</button>
        </form>
      </div>
    </div>
  );
}

export default Registration;


/*
import React, { useState } from "react";
import "./registration.css";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phonePattern.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const userData = {
      name,
      email,
      phone,
      password,
    };

    console.log(userData);
    alert("Registration Successful!");
  };

  return (
    <div className="registration-form-container">
      <div className="image-section">
        <img src="/images/palm_earth_full.png" alt="Hand holding the Earth" className="palm-earth" />
      </div>

      <div className="form-section">
        <h1>Be a Changemaker: Volunteer with Us</h1>
        <p>Get started by making an account with us!</p>

        <form className="registration-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="8023456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Volunteer Now</button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
*/