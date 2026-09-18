import { useEffect, useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://my-portfolio-backend-u8gq.onrender.com/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.log("Projects loading error:", error);
      });
  }, []);

  return (
    <section id="projects">
      <div className="projects-content">

        <h2>My Projects</h2>

        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="projects-list">

            {projects.map((project, index) => (
              <div
                className={`project-row ${index % 2 === 1 ? "project-row-reverse" : ""}`}
                key={project.id}
              >

                {project.image && (
                  <div className="project-image-big-wrap">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="project-image-big"
                    />
                  </div>
                )}

                <div className="project-info">

                  <span className="project-tag-label">FEATURED PROJECT</span>

                  <h3>{project.name}</h3>

                  <div className="project-description-box">
                    <p>{project.description}</p>
                  </div>

                  {project.technology && (
                    <div className="tech-tags">
                      {project.technology.split(",").map((tech, i) => (
                        <span className="tech-tag" key={i}>
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="project-links">

                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer" title="View Code">
                        <FaGithub /> Code
                      </a>
                    )}

                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noopener noreferrer" title="Live Demo">
                        <FaExternalLinkAlt /> Live
                      </a>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;