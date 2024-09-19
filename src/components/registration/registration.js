import React, { useState } from 'react';
import './Registration.css';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Phone number validation (example)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    // Form data submission
    const formData = {
      name,
      email,
      phone,
      password,
    };

    console.log('Form submitted:', formData);
    // You can send `formData` to the server here via API call
  };

  return (
    <div className="registration-page-container">
      <div className="image-section">
        <img src="/public/images/palm_earth.png" alt="Hand holding the Earth" className="palm-earth" />
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your 10-digit phone number"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a secure password"
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