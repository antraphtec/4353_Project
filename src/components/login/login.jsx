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
      // Authenticate the user using Supabase Auth
      const { data: session, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (session) {
        // Fetch user role from the "accounts" table
        const { data, error: roleError } = await supabase
          .from("accounts")
          .select("role")
          .eq("email_address", email)
          .single();

        if (roleError) {
          throw roleError;
        }

        if (data.role === "admin") {
          // Redirect to the admin dashboard
          navigate("/admin");
        } else {
          // Redirect to the volunteer profile management page
          navigate("/profile");
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
            onClick={() => setIsAdmin(false)}
            className={!isAdmin ? "selected" : ""}
          >
            Volunteer
          </button>
          <button
            type="button"
            onClick={() => setIsAdmin(true)}
            className={isAdmin ? "selected" : ""}
          >
            Admin
          </button>
        </div>

        <label>{isAdmin ? "Admin Email:" : "Volunteer Email:"}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={isAdmin ? "admin@example.com" : "volunteer@example.com"}
        />

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

        <button
          type="submit"
          className={`login-button ${isAdmin ? "admin-button" : "volunteer-button"}`}
        >
          {isAdmin ? "Log In as Admin" : "Log In as Volunteer"}
        </button>
      </form>
    </div>
  );
};

export default Login;
