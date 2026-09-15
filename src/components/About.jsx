function About() {
  return (
    <section id="about">
      <div className="about-content">
        <h2>About Me</h2>

        <p style={{ marginBottom: "16px" }}>
          I am a Software Engineering student with an interest in
          Web Development, Python and Machine Learning.
        </p>

        <p style={{ marginBottom: "35px" }}>
          I enjoy learning new technologies and building projects
          to improve my programming skills.
        </p>

        <div className="about-highlights">
          <div className="highlight-card">
            <h3>3.5+</h3>
            <p>Years Learning</p>
          </div>
          <div className="highlight-card">
            <h3>10+</h3>
            <p>Projects Built</p>
          </div>
          <div className="highlight-card">
            <h3>3+</h3>
            <p>Technologies</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About