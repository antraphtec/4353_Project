import React, { useState } from "react";
import "./registration.css";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://ucgkrnaqwrfaerbivysj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjZ2tybmFxd3JmYWVyYml2eXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxNjEyMjYsImV4cCI6MjA0MDczNzIyNn0.nWiEXSfP5fDOxEbyeFEGgfeSAzThobRl2HsxQf1yQZY"
);

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("volunteer");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
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

    // Sign up user with Supabase
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            // Optional: additional user metadata
            name,
            phone,
          },
        },
      });

      if (error) {
        alert("Registration failed: " + error.message);
      } else {
        // Create user record in "accounts" table
        const { error: insertError } = await supabase.from("accounts").insert([
          {
            fullName: name,
            email_address: email,
            phone,
            role,
          },
        ]);

        if (insertError) {
          console.error("Error creating account in database:", insertError);
          alert("Something went wrong, please try again later.");
        } else {
          alert(
            "Registration successful! Please check your email for verification."
          );
          navigate("/login"); // Redirect to login page after successful registration
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong, please try again later.");
    }
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
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="show-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show password</label>
          </div>

          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register Now</button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
