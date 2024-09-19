import React, {useState} from "react";
import "./Login.css";
//import { Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); 

const handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = {
      email: email,
      password: password,
      type: isAdmin ? 'Admin' : 'Volunteer'
    };
    console.log(userInfo); 
  };

  return (
    <div className="login-page-container">
      <div className="login-left"></div>


      <div className="login-right"></div>
        <div className="login-box">
          <h2>Already a Volunteer? Log In</h2>

          <div className="login-toggle">
            <button onClick={() => setIsAdmin(false)} disabled={!isAdmin}>Volunteer Log In</button>
            <button onClick={() => setIsAdmin(true)} disabled={isAdmin}>Admin Log In</button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Log In</button>
          </form>

          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
  );
}


export default Login;