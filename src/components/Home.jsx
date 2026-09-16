import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://   https://my-portfolio-backend-u8gq.onrender.com/profile")
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

              <p style={{ maxWidth: "500px" }}>
                {profile.introduction}
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
                <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">
                  <FaLinkedin />
                </a>
                <a href={`mailto:${profile.email || "you@example.com"}`}>
                  <HiOutlineMail />
                </a>
              </div>
            </div>

            {profile.profile_image && (
              <div className="home-right">
                <div className="profile-image-wrapper">
                  <img
                    src={profile.profile_image}
                    alt={profile.name}
                    className="profile-image"
                  />
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