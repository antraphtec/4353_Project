import React from 'react';
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