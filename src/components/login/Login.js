import React, {useState} from "react";
import "./Login.css";
import { useNavigate} from "react-router-dom";



function Login() {
  const [email, setEmail] = useState('');
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = {
      identifier: isAdmin ? adminId : email, 
      password,
      type: isAdmin ? 'Admin' : 'Volunteer'
    };
    console.log(userInfo); 
  };

  return (
    <div className="login-page-container">
      <div className="login-left"></div>


      <div className="login-right"></div>
        <div className="login-box">

          <button className="back-link" onClick={() => navigate('/')}>← Back to Home</button>
              
          <h2>Already an {isAdmin ? 'Admin' : 'Volunteer'}? Log In</h2> 

          <div className="login-toggle">
            {/* Volunteer Log In Button */}
            <button
              onClick={() => setIsAdmin(false)}
              className={!isAdmin ? 'login-type-button active' : 'login-type-button'}
            >
              Volunteer Log In
            </button>

            {/* Admin Log In Button */}
            <button
              onClick={() => setIsAdmin(true)}
              className={isAdmin ? 'login-type-button active' : 'login-type-button'}
            >
              Admin Log In
            </button>
          </div>


          <form onSubmit={handleSubmit}>
            {!isAdmin ? (
              <>
                <label>Email Address:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
              />
            </>
          ) : (
            <>
              <label>Admin ID:</label>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter your Admin ID"
                required
              />
            </>
          )}

            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <div className="show-password">
              <input
                type="checkbox"
                id="showPassword"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show password</label>
            </div>

            <button type="submit" className="login-button">Log In</button>
          </form>

          <div className="forgot-links">
            <a href="/forgot-password">Forgot Password?</a>
            {isAdmin && <a href="/forgot-admin-id">Forgot Admin ID?</a>} {/* Show only for Admin */}
          </div>
        </div>
      </div>
    );
  }


export default Login;