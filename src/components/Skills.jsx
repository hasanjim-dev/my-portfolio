import { useEffect, useState } from "react";
import {
  FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact,
  FaNodeJs, FaGitAlt, FaPhp, FaJsSquare, FaDesktop, FaDatabase, FaTools
} from "react-icons/fa";
import { SiCplusplus, SiMongodb, SiExpress, SiTypescript, SiTailwindcss, SiMysql, SiFirebase, SiPostgresql } from "react-icons/si";

const iconMap = {
  "c": <SiCplusplus />,
  "c++": <SiCplusplus />,
  "python": <FaPython />,
  "java": <FaJava />,
  "html": <FaHtml5 />,
  "html5": <FaHtml5 />,
  "css": <FaCss3Alt />,
  "css3": <FaCss3Alt />,
  "react": <FaReact />,
  "node.js": <FaNodeJs />,
  "nodejs": <FaNodeJs />,
  "node": <FaNodeJs />,
  "express": <SiExpress />,
  "express.js": <SiExpress />,
  "mongodb": <SiMongodb />,
  "mysql": <SiMysql />,
  "postgresql": <SiPostgresql />,
  "firebase": <SiFirebase />,
  "javascript": <FaJsSquare />,
  "js": <FaJsSquare />,
  "typescript": <SiTypescript />,
  "tailwind": <SiTailwindcss />,
  "php": <FaPhp />,
  "git": <FaGitAlt />,
};

// skill নাম দেখে category বের করার লজিক (partial match)
const categoryKeywords = {
  Frontend: ["html", "css", "react", "javascript", "js", "typescript", "tailwind"],
  Backend: ["node", "express", "php", "java", "c++", "c", "python"],
  Database: ["mongodb", "mysql", "postgresql", "firebase", "sql"],
  Tools: ["git", "github", "vscode", "figma", "postman"],
};

const categoryIcons = {
  Frontend: <FaDesktop />,
  Backend: <FaTools />,
  Database: <FaDatabase />,
  Tools: <FaTools />,
};

function getCategory(name) {
  const key = name?.toLowerCase().trim().replace(/\s+/g, "");
  for (const category in categoryKeywords) {
    const found = categoryKeywords[category].some((keyword) =>
      key.includes(keyword.replace(/\s+/g, ""))
    );
    if (found) {
      return category;
    }
  }
  return "Tools";
}

function getIcon(name) {
  const key = name?.toLowerCase().trim();
  return iconMap[key] || <FaJsSquare />;
}

function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetch("http://   https://my-portfolio-backend-u8gq.onrender.com/skills")
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);
      })
      .catch((error) => {
        console.log("Skills loading error:", error);
      });
  }, []);

  const categories = ["Frontend", "Backend", "Database", "Tools"];

  const groupedSkills = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter((skill) => getCategory(skill.name) === cat);
    return acc;
  }, {});

  return (
    <section id="skills">
      <div className="skills-content">

        <h2>My Skills</h2>

        {skills.length === 0 ? (
          <p>No skills found.</p>
        ) : (
          <div className="skills-category-grid">

            {categories.map((cat) => (
              <div
                className="skill-category-card"
                key={cat}
                onMouseEnter={() => setActiveCategory(cat)}
                onMouseLeave={() => setActiveCategory(null)}
              >

                {activeCategory === cat ? (
                  <div className="skill-category-list">
                    <p className="skill-category-label">{cat}</p>
                    {groupedSkills[cat].length === 0 ? (
                      <p className="skill-empty">No skills added</p>
                    ) : (
                      groupedSkills[cat].map((skill) => (
                        <div className="skill-item-row" key={skill.id}>
                          <span className="skill-item-icon">{getIcon(skill.name)}</span>
                          <span>{skill.name}</span>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="skill-category-placeholder">
                    <div className="skill-category-icon">{categoryIcons[cat]}</div>
                    <p>{cat.toUpperCase()}</p>
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Skills;