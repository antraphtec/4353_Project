// src/components/registration/Registration.js
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
        <img src="/images/palm_earth.png" alt="Hand holding the Earth" className="palm-earth" />
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

/*import React from 'react';
import './registration.css';

document.querySelector('.registration-form').addEventListener('submit', function(event) {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
  
    // Basic Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(emailInput.value)) {
      alert('Please enter a valid email address.');
      event.preventDefault(); // Prevent form submission
      return;
    }
  
    // Phone number validation (Nigeria example)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneInput.value)) {
      alert('Please enter a valid 10-digit phone number.');
      event.preventDefault();
    }
  });


  export default Registration;
  */