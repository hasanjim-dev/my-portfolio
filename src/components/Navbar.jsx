import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <h2>Hasan Jim</h2>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#skills" onClick={closeMenu}>Skills</a>
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a href="#certificates" onClick={closeMenu}>Certificates</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="resume-btn"
          onClick={closeMenu}
        
          Resume
        
      </div>
    </nav>
  );
}

export default Navbar;