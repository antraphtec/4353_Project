import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
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
      <Routes> 
        <Route path="/" element={<HERO />} /> 
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