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
    <div className="login-container">
      <h2>Already a Volunteer? Log In</h2>
      <div className="login-toggle">
        <button onClick={() => setIsAdmin(false)} disabled={!isAdmin}>Volunteer Log In</button>
        <button onClick={() => setIsAdmin(true)} disabled={isAdmin}>Admin Log In</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Email Address:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;