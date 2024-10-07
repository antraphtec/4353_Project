import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ supabase }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminId, setAdminId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;
      if (isAdmin) {
        // Assuming admins use a unique adminId email format
        response = await supabase.auth.signInWithPassword({
          email: `${adminId}@yourdomain.com`,
          password,
        });
      } else {
        // Volunteer login
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      if (response.error) {
        throw response.error;
      }

      // On successful login, navigate to the dashboard or desired page
      navigate("/profileManagement");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleSubmit}>
        <h2>{isAdmin ? "Admin Log In" : "Volunteer Log In"}</h2>
        <div className="login-toggle">
          <button type="button" onClick={() => setIsAdmin(false)}>
            Volunteer
          </button>
          <button type="button" onClick={() => setIsAdmin(true)}>
            Admin
          </button>
        </div>

        {isAdmin ? (
          <>
            <label>Admin ID:</label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        )}

        <label>Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label>Show password</label>
        </div>

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
