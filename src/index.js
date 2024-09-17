import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NAVBAR from "./components/NavBar";
import HERO from "./components/hero";
import Footer from "./components/footer";
import ADMINLOGIN from "./components/AdminLogin";
import './styles/LoginModal.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };
  
  return (
    <Router>
        <NAVBAR handleSignInClick={handleSignInClick} />
      <HERO />
      <Routes>
        <Route path="/admin-login" element={<ADMINLOGIN />} />
      </Routes>

      {showLogin && (
        <div className="login-modal">
          <ADMINLOGIN />
          <button onClick={closeLogin}>Close</button> 
        </div>
      )}

      <Footer />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
