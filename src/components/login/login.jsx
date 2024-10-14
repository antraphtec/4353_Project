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
        // Assuming admins use a unique email format for login
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

      // On successful login, check user role
      const userId = response.data.user.id;

      // Fetch the role from the "accounts" table
      const { data, error } = await supabase
        .from("accounts")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        throw error;
      }

      // Navigate based on user role
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
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
