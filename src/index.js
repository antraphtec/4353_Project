import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import NAVBAR from "./components/NavBar";
import HERO from "./components/hero";
import Footer from "./components/footer";
import ProfileManagement from "./components/profileManagement/profileManagementPage.jsx";
import VolunteerMatching from "./components/matching/matching.jsx";


function App() {
  return (
    <Router>
      <NAVBAR />
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<HERO />} /> {/* Use element prop */}
        <Route path="/profile" element={<ProfileManagement />} /> {/* Use element prop */}
        <Route path="/matching" element={<VolunteerMatching />} /> {/* Use element prop */}
      </Routes>
      <Footer />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
