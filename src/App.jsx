import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import ParticleBackground, { FastDots } from "./components/ParticleBackground";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";

function Portfolio() {
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