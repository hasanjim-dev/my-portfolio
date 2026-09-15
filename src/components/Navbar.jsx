function Navbar() {
  return (
    <nav className="navbar">
      <h2>Hasan Jim</h2>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#certificates">Certificates</a>
        <a href="#contact">Contact</a>
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="resume-btn">
          Resume
        </a>
      </div>
    </nav>
  );
}

export default Navbar;