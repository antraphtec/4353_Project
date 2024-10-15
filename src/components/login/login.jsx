import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ supabase }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Attempt login with Supabase
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (response.error) {
        throw response.error;
      }

      // Fetch the role from the "accounts" table
      const { data, error } = await supabase
        .from("accounts")
        .select("role")
        .eq("email_address", email) // Use email_address to find the user
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        throw error;
      }

      // Navigate based on user role and selected login type (admin/volunteer)
      if (isAdmin) {
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          alert("You do not have admin privileges.");
        }
      } else {
        if (data.role === "volunteer") {
          navigate("/volunteer");
        } else {
          alert("This account is not registered as a volunteer.");
        }
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleSubmit}>
        <h2>{isAdmin ? "Admin Log In" : "Volunteer Log In"}</h2>
        <div className="login-toggle">
          <button
            type="button"
            className={`volunteer-button ${!isAdmin ? "active" : ""}`}
            onClick={() => setIsAdmin(false)}
          >
            Volunteer
          </button>
          <button
            type="button"
            className={`admin-button ${isAdmin ? "active" : ""}`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
        </div>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label>Show password</label>
        </div>

        <button type="submit" className={isAdmin ? "admin-submit" : "volunteer-submit"}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
