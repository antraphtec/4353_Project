import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NAVBAR from "./components/NavBar";
import HERO from "./components/hero";
import Footer from "./components/footer";
import Login from "./components/Login"; 
import ProfileManagement from "./components/profileManagement/profileManagementPage.jsx";
import VolunteerMatching from "./components/matching/matching.jsx";


function App() {
  return (
    <Router>
      <NAVBAR />
      {/* <HERO /> */}
      <Routes> 
        <Route path="/" element={<HERO />} /> 
        {/* <Route path="/about" element={<div>About Page</div>} /> */}
        {/* <Route path="/get-involved" element={<div>Get Involved Page</div>} /> */}
        <Route path="/about" element={<HERO />} />
        <Route path="/get-involved" element={<HERO />} />
        {/* <Route path="/volunteer" element={<HERO />} /> */}
        <Route path="/volunteer" element={<div>Volunteer Page</div>} />
        <Route path="/profile" element={<ProfileManagement />} /> 
        <Route path="/matching" element={<VolunteerMatching />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);