import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NAVBAR from "./components/NavBar";
import HERO from "./components/hero";
import Footer from "./components/footer";
import ADMINLOGIN from "./components/AdminLogin";

function App() {
  return (
    <Router>
      <NAVBAR />
      <Routes>
        <Route path="/" element={<HERO />} />
        <Route path="/ admin-login" element={<ADMINLOGIN />} />
      </Routes>
      <HERO />
      <Footer />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
