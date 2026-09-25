import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ParticleBackground, { FastDots } from "./components/ParticleBackground";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";

function Portfolio() {
  useEffect(() => {
    // Prevent browser from restoring the previous scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Always start the portfolio from the Home section
    window.history.replaceState(null, "", "#home");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ParticleBackground />
      <FastDots />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
}

function ProtectedAdmin() {
  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (isLoggedIn !== "true") {
    return <Navigate to="/admin-login" replace />;
  }

  return <Admin />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedAdmin />} />
    </Routes>
  );
}

export default App;