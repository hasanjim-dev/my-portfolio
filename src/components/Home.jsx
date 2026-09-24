import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Typewriter from "typewriter-effect";

function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("https://my-portfolio-backend-u8gq.onrender.com/profile")
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.log("Profile loading error:", error);
      });
  }, []);

  return (
    <section id="home">
      <div className="home-content">

        {profile ? (
          <>
            <div className="home-left">
              <div className="status-badge">
                <span className="status-dot"></span>
                Open to new opportunities
              </div>

              <p className="intro">Hello, I'm</p>

              <h1>{profile.name}</h1>

              <h2>{profile.designation}</h2>

              <p style={{ maxWidth: "500px", textTransform: "uppercase" }}>
                <Typewriter
                  options={{
                    strings: [
                      profile.introduction || "FULL STACK DEVELOPER",
                      "FRONTEND DEVELOPER",
                      "MERN STACK DEVELOPER",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 40,
                  }}
                />
              </p>

              <div className="hero-buttons">
                <button
                  onClick={() => {
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View My Projects
                </button>

                <button
                  className="btn-outline"
                  onClick={() => {
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Contact Me
                </button>
              </div>

              <div className="social-icons">
                <a href="https://github.com/hasanjim-dev" target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/muntasir-hasan-jim-1804b643a/" target="_blank" rel="noreferrer">
                  <FaLinkedin />
                </a>
                <a href={`mailto:${profile.email || "hasanjim2345@gmail.com"}`}>
                  <HiOutlineMail />
                </a>
              </div>
            </div>

            {profile.profile_image && (
              <div className="home-right">
                <div className="profile-image-wrapper-outer">
                  <div className="profile-glow-ring"></div>
                  <div className="profile-ring-2"></div>
                  <div className="profile-ring-1"></div>
                  <div className="profile-image-wrapper">
                    <img
                      src={profile.profile_image}
                      alt={profile.name}
                      className="profile-image"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Loading profile...</p>
        )}

      </div>
    </section>
  );
}

export default Home;