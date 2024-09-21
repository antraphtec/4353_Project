import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import "./Login.css";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Toggle between Admin and Volunteer
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminId, setAdminId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false); // For modal
  const [resetEmail, setResetEmail] = useState(""); // Email input for resetting password
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const credentials = isAdmin ? { adminId, password } : { email, password };
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      const result = await response.json();
      
      if (response.ok) {
        // If login is successful
        navigate('/dashboard');
      } else {
        alert('Login failed: ' + result.message);
      }
    } catch (error) {
      alert('Something went wrong, please try again later.');
    }
  };

  const handlePasswordReset = () => {
    // Handle password reset email submission
    alert(`Password reset link sent to: ${resetEmail}`);
    setForgotPasswordModal(false);
  };

  return (
    <div className="login-page-container">
      <div className="login-left">
        <img src={isAdmin ? "/images/group.png" : "/images/boy.png"} alt={isAdmin ? "Admin Visual" : "Volunteer Visual"} />
      </div>

      <div className="login-right">
        <button className="back-link" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h2>{isAdmin ? "Already an Admin? Log In" : "Already a Volunteer? Log In"}</h2>
        <div className="login-toggle">
          <button className={!isAdmin ? "active" : ""} onClick={() => setIsAdmin(false)}>Volunteer Log In</button>
          <button className={isAdmin ? "active" : ""} onClick={() => setIsAdmin(true)}>Admin Log In</button>
        </div>

        <form onSubmit={handleSubmit}>
          {isAdmin ? (
            <>
              <label>Admin ID:</label>
              <input type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} placeholder="Enter your Admin ID" required />
            </>
          ) : (
            <>
              <label>Email Address:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            </>
          )}
          <label>Password:</label>
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />

          <div className="show-password">
            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            <label>Show password</label>
          </div>

          <button type="submit">Log In</button>
        </form>

        <div className="forgot-links">
          <a onClick={() => setForgotPasswordModal(true)} style={{ cursor: 'pointer' }}>Forgot Password?</a>
          {isAdmin && <a href="/forgot-admin-id">Forgot Admin ID?</a>}
        </div>

        {/* Modal for password reset */}
        <Modal
          open={forgotPasswordModal}
          onClose={() => setForgotPasswordModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...modalStyle }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Reset Password
            </Typography>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              margin="normal"
            />
            <Button onClick={handlePasswordReset} variant="contained" fullWidth>
              Send Reset Link
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

export default Login;
