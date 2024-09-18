import React, { useState } from 'react';
import './registration.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Email validation
  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/.test(email);

  // Phone validation for Nigerian numbers
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validatePhone(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    // Proceed with submitting the form data
    console.log('Form Submitted:', { email, phone });
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
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