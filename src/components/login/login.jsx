import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminId, setAdminId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [forgotAdminIDModal, setForgotAdminIDModal] = useState(false); // Admin ID modal
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
        navigate('/dashboard');
      } else {
        alert('Login failed: ' + result.message);
      }
    } catch (error) {
      alert('Something went wrong, please try again later.');
    }
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
          <a href="#" onClick={() => setForgotPasswordModal(true)} style={{ cursor: 'pointer' }}>Forgot Password?</a>
          {isAdmin && (
            <a href="#" onClick={() => setForgotAdminIDModal(true)} style={{ cursor: 'pointer' }}>Forgot Admin ID?</a>
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Reset Password</h3>
            <p>Enter your email, and we'll send you instructions to reset your password.</p>
            <input type="email" placeholder="Enter your email" />
            <button onClick={() => setForgotPasswordModal(false)}>Send Reset Link</button>
            <button onClick={() => setForgotPasswordModal(false)} className="close-modal">Close</button>
          </div>
        </div>
      )}

      {/* Forgot Admin ID Modal */}
      {forgotAdminIDModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Forgot Admin ID</h3>
            <p>Please contact your system administrator to retrieve your Admin ID.</p>
            <button onClick={() => setForgotAdminIDModal(false)} className="close-modal">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
