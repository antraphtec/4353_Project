import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NAVBAR from "./components/NavBar.js";
import HERO from "./components/hero.js";
import Footer from "./components/footer.js";
import Login from "./components/login/Login.js"; 
import ProfileManagement from "./components/profileManagement/profileManagementPage.jsx";
import VolunteerMatching from "./components/matching/matching.jsx";
import Registration from "./components/registration/registration.js";
import EventManagement from "./components/eventManagement/EventManagement.js";


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
        <Route path="/registration" element={<Registration />} />
        <Route path="/eventmanagement" element={<EventManagement />} />
      </Routes>
      <Footer />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);