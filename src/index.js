import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NAVBAR from "./components/NavBar";
import HERO from "./components/hero";
import Footer from "./components/footer";
import LOGIN from "./components/Login";

import './styles/LoginModal.css';

function App() {
  
  return (
    <Router>
      <NAVBAR />
      <Routes>

        <Route path="/" element={<>
          <HERO />
        </>} />

        <Route path="/about" element={<>
          <HERO />
        </>} />

        <Route path="/login" element={<LOGIN />} />

        <Route path="/get-involved" element={<>
          <HERO />
        </>} />

      </Routes>
      <Footer />
    </Router>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
