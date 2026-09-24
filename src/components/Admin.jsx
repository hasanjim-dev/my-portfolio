import { useEffect, useState } from "react";

const API = "https://my-portfolio-backend-u8gq.onrender.com";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [showCertificates, setShowCertificates] = useState(false);

  const [showProfileForm, setShowProfileForm] = useState(false);

  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  const [showImages, setShowImages] = useState(false);

  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [images, setImages] = useState([]);

  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingCertificateId, setEditingCertificateId] = useState(null);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [profileId, setProfileId] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [technology, setTechnology] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [selectedProjectImage, setSelectedProjectImage] = useState(null);
  const [uploadingProjectImage, setUploadingProjectImage] = useState(false);

  const [certificateName, setCertificateName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [certificateDate, setCertificateDate] = useState("");
  const [certificateLink, setCertificateLink] = useState("");
  const [certificateImage, setCertificateImage] = useState("");

  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [skillCategory, setSkillCategory] = useState("Frontend");

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [profileName, setProfileName] = useState("");
  const [designation, setDesignation] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginLoading(true);

    try {
      const response = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminUsername", data.user.username);

      setIsLoggedIn(true);
      setUsername("");
      setPassword("");

      alert("Login successful!");
    } catch (error) {
      console.log("Login error:", error);

      alert(
        "Cannot connect to server. Please make sure the backend server is running."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUsername");

    setIsLoggedIn(false);

    setShowProjectForm(false);
    setShowProjects(false);
    setShowCertificateForm(false);
    setShowCertificates(false);
    setShowProfileForm(false);
    setShowSkillForm(false);
    setShowSkills(false);
    setShowImages(false);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");

    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // =========================
  // SHARED IMAGE UPLOAD HELPER
  // =========================

  const uploadImageFile = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(`${API}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return "";
    }

    return data.imageUrl;
  };

  // =========================
  // PROJECTS
  // =========================

  const loadProjects = async () => {
    try {
      const response = await fetch(`${API}/projects`);

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.log("Error loading projects:", error);
    }
  };

  const handleProjectImageSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedProjectImage(file);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    let imageUrl = projectImage;

    if (selectedProjectImage) {
      setUploadingProjectImage(true);
      imageUrl = await uploadImageFile(selectedProjectImage);
      setUploadingProjectImage(false);

      if (!imageUrl) {
        return;
      }
    }

    try {
      const response = await fetch(`${API}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          technology,
          github_link: githubLink,
          live_link: liveLink,
          image: imageUrl,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        setName("");
        setDescription("");
        setTechnology("");
        setGithubLink("");
        setLiveLink("");
        setProjectImage("");
        setSelectedProjectImage(null);

        setShowProjectForm(false);

        loadProjects();
      }
    } catch (error) {
      console.log("Error:", error);

      alert("Project add failed!");
    }
  };

  const handleEditProject = (project) => {
    setEditingProjectId(project.id);

    setName(project.name);
    setDescription(project.description);
    setTechnology(project.technology || "");
    setGithubLink(project.github_link || "");
    setLiveLink(project.live_link || "");
    setProjectImage(project.image || "");
    setSelectedProjectImage(null);

    setShowProjectForm(true);
    setShowProjects(false);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();

    let imageUrl = projectImage;

    if (selectedProjectImage) {
      setUploadingProjectImage(true);
      imageUrl = await uploadImageFile(selectedProjectImage);
      setUploadingProjectImage(false);

      if (!imageUrl) {
        return;
      }
    }

    try {
      const response = await fetch(`${API}/projects/${editingProjectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          technology,
          github_link: githubLink,
          live_link: liveLink,
          image: imageUrl,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        setEditingProjectId(null);

        setName("");
        setDescription("");
        setTechnology("");
        setGithubLink("");
        setLiveLink("");
        setProjectImage("");
        setSelectedProjectImage(null);

        setShowProjectForm(false);

        loadProjects();
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API}/projects/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        loadProjects();
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // =========================
  // CERTIFICATES
  // =========================

  const loadCertificates = async () => {
    try {
      const response = await fetch(`${API}/certificates`);

      const data = await response.json();

      setCertificates(data);
    } catch (error) {
      console.log("Error loading certificates:", error);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
    }
  };

  const handleAddCertificate = async (e) => {
    e.preventDefault();

    let imageUrl = certificateImage;

    if (selectedImage) {
      setUploadingImage(true);
      imageUrl = await uploadImageFile(selectedImage);
      setUploadingImage(false);

      if (!imageUrl) {
        return;
      }
    }

    try {
      const response = await fetch(`${API}/certificates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: certificateName,
          issuer,
          date: certificateDate,
          certificate_link: certificateLink,
          image: imageUrl,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        setCertificateName("");
        setIssuer("");
        setCertificateDate("");
        setCertificateLink("");
        setCertificateImage("");
        setSelectedImage(null);

        setShowCertificateForm(false);

        loadCertificates();
      }
    } catch (error) {
      console.log("Certificate error:", error);

      alert("Certificate add failed!");
    }
  };

  const handleEditCertificate = (certificate) => {
    setEditingCertificateId(certificate.id);

    setCertificateName(certificate.name);
    setIssuer(certificate.issuer || "");
    setCertificateDate(certificate.date || "");
    setCertificateLink(certificate.certificate_link || "");
    setCertificateImage(certificate.image || "");

    setSelectedImage(null);

    setShowCertificateForm(true);
    setShowCertificates(false);
  };

  const handleUpdateCertificate = async (e) => {
    e.preventDefault();

    let imageUrl = certificateImage;

    if (selectedImage) {
      setUploadingImage(true);
      imageUrl = await uploadImageFile(selectedImage);
      setUploadingImage(false);

      if (!imageUrl) {
        return;
      }
    }

    try {
      const response = await fetch(
        `${API}/certificates/${editingCertificateId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: certificateName,
            issuer,
            date: certificateDate,
            certificate_link: certificateLink,
            image: imageUrl,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        setEditingCertificateId(null);

        setCertificateName("");
        setIssuer("");
        setCertificateDate("");
        setCertificateLink("");
        setCertificateImage("");
        setSelectedImage(null);

        setShowCertificateForm(false);

        loadCertificates();
      }
    } catch (error) {
      console.log("Certificate update error:", error);
    }
  };

  const handleDeleteCertificate = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API}/certificates/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        loadCertificates();
      }
    } catch (error) {
      console.log("Certificate delete error:", error);
    }
  };

  // =========================
  // PROFILE
  // =========================

  const loadProfile = async () => {
    try {
      const response = await fetch(`${API}/profile`);

      const data = await response.json();

      if (data) {
        setProfileId(data.id);
        setProfileName(data.name || "");
        setDesignation(data.designation || "");
        setIntroduction(data.introduction || "");
        setProfileImage(data.profile_image || "");
      }
    } catch (error) {
      console.log("Error loading profile:", error);
    }
  };

  const handleProfileImageSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedProfileImage(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    let imageUrl = profileImage;

    if (selectedProfileImage) {
      setUploadingProfileImage(true);
      imageUrl = await uploadImageFile(selectedProfileImage);
      setUploadingProfileImage(false);
    }

    try {
      let response;

      if (profileId) {
        response = await fetch(`${API}/profile/${profileId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profileName,
            designation,
            introduction,
            profile_image: imageUrl,
          }),
        });
      } else {
        response = await fetch(`${API}/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profileName,
            designation,
            introduction,
            profile_image: imageUrl,
          }),
        });
      }

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        setProfileImage(imageUrl);
        setSelectedProfileImage(null);

        await loadProfile();

        setShowProfileForm(false);
      }
    } catch (error) {
      console.log("Profile save error:", error);

      alert("Profile save failed!");
    }
  };

  // =========================
  // SKILLS
  // =========================

  const loadSkills = async () => {
    try {
      const response = await fetch(`${API}/skills`);

      const data = await response.json();

      setSkills(data);
    } catch (error) {
      console.log("Error loading skills:", error);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: skillName,
          level: skillLevel,
          category: skillCategory,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        setSkillName("");
        setSkillLevel("");
        setSkillCategory("Frontend");

        setShowSkillForm(false);

        loadSkills();
      }
    } catch (error) {
      console.log("Skill add error:", error);

      alert("Skill add failed!");
    }
  };

  const handleEditSkill = (skill) => {
    setEditingSkillId(skill.id);

    setSkillName(skill.name);
    setSkillLevel(skill.level || "");
    setSkillCategory(skill.category || "Frontend");

    setShowSkillForm(true);
    setShowSkills(false);
  };

  const handleUpdateSkill = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/skills/${editingSkillId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: skillName,
          level: skillLevel,
          category: skillCategory,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        setEditingSkillId(null);

        setSkillName("");
        setSkillLevel("");
        setSkillCategory("Frontend");

        setShowSkillForm(false);

        loadSkills();
      }
    } catch (error) {
      console.log("Skill update error:", error);

      alert("Skill update failed!");
    }
  };

  const handleDeleteSkill = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API}/skills/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        loadSkills();
      }
    } catch (error) {
      console.log("Skill delete error:", error);

      alert("Skill delete failed!");
    }
  };

  // =========================
  // MANAGE IMAGES
  // =========================

  const loadImages = async () => {
    try {
      const response = await fetch(`${API}/images`);

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setImages(data);
    } catch (error) {
      console.log("Error loading images:", error);

      alert("Cannot load images!");
    }
  };

  const handleDeleteImage = async (filename) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/images/${encodeURIComponent(filename)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        loadImages();
      }
    } catch (error) {
      console.log("Image delete error:", error);

      alert("Image delete failed!");
    }
  };

  // =========================
  // LOAD DATA AFTER LOGIN
  // =========================

  useEffect(() => {
    if (isLoggedIn) {
      loadProjects();
      loadCertificates();
      loadProfile();
      loadSkills();
    }
  }, [isLoggedIn]);

  // =========================
  // LOGIN PAGE
  // =========================

  if (!isLoggedIn) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-box">
          <h1>Admin Login</h1>

          <p>Login to manage your portfolio.</p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loginLoading}>
              {loginLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // =========================
  // ADMIN DASHBOARD
  // =========================

  return (
    <div className="admin-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Admin Dashboard</h1>

          <p>Manage your portfolio website from here.</p>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* ADMIN MENU */}

      <div className="admin-menu">
        <button
          onClick={() => {
            setShowProjectForm(true);
            setShowProjects(false);
            setShowCertificateForm(false);
            setShowCertificates(false);
            setShowProfileForm(false);
            setShowSkillForm(false);
            setShowSkills(false);
            setShowImages(false);

            setEditingProjectId(null);

            setName("");
            setDescription("");
            setTechnology("");
            setGithubLink("");
            setLiveLink("");
            setProjectImage("");
            setSelectedProjectImage(null);
          }}
        >
          Add Project
        </button>

        <button
          onClick={() => {
            setShowProjects(true);
            setShowProjectForm(false);
            setShowCertificateForm(false);
            setShowCertificates(false);
            setShowProfileForm(false);
            setShowSkillForm(false);
            setShowSkills(false);
            setShowImages(false);

            loadProjects();
          }}
        >
          Manage Projects
        </button>

        <button
          onClick={() => {
            setShowCertificateForm(true);
            setShowCertificates(false);
            setShowProjectForm(false);
            setShowProjects(false);
            setShowProfileForm(false);
            setShowSkillForm(false);
            setShowSkills(false);
            setShowImages(false);

            setEditingCertificateId(null);

            setCertificateName("");
            setIssuer("");
            setCertificateDate("");
            setCertificateLink("");
            setCertificateImage("");
            setSelectedImage(null);
          }}
        >
          Add Certificate
        </button>

        <button
          onClick={() => {
            setShowCertificates(true);
            setShowCertificateForm(false);
            setShowProjectForm(false);
            setShowProjects(false);
            setShowProfileForm(false);
            setShowSkillForm(false);
            setShowSkills(false);
            setShowImages(false);

            loadCertificates();
          }}
        >
          Manage Certificates
        </button>

        <button
          onClick={() => {
            setShowSkillForm(true);
            setShowSkills(false);
            setShowProjectForm(false);
            setShowProjects(false);
            setShowCertificateForm(false);
            setShowCertificates(false);
            setShowProfileForm(false);
            setShowImages(false);

            setEditingSkillId(null);

            setSkillName("");
            setSkillLevel("");
            setSkillCategory("Frontend");
          }}
        >
          Add Skill
        </button>

        <button
          onClick={() => {
            setShowSkills(true);
            setShowSkillForm(false);
            setShowProjectForm(false);
            setShowProjects(false);
            setShowCertificateForm(false);
            setShowCertificates(false);
            setShowProfileForm(false);
            setShowImages(false);

            loadSkills();
          }}
        >
          Manage Skills
        </button>

        <button
          onClick={() => {
            setShowImages(true);

            setShowProjectForm(false);
            setShowProjects(false);
            setShowCertificateForm(false);
            setShowCertificates(false);
            setShowProfileForm(false);
            setShowSkillForm(false);
            setShowSkills(false);

            loadImages();
          }}
        >
          Manage Images
        </button>

        <button
          onClick={() => {
            setShowProfileForm(true);

            setShowProjectForm(false);
            setShowProjects(false);
            setShowCertificateForm(false);
            setShowCertificates(false);
            setShowSkillForm(false);
            setShowSkills(false);
            setShowImages(false);

            loadProfile();
          }}
        >
          Edit Profile
        </button>
      </div>

      {/* PROFILE FORM */}

      {showProfileForm && (
        <div className="profile-form">
          <h2>Edit Profile</h2>

          <form onSubmit={handleSaveProfile}>
            <input
              type="text"
              placeholder="Your Name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />

            <textarea
              placeholder="Introduction"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            ></textarea>

            <label>Profile Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageSelect}
            />

            {selectedProfileImage && (
              <p>Selected: {selectedProfileImage.name}</p>
            )}

            {profileImage && !selectedProfileImage && (
              <div>
                <p>Current Profile Image:</p>

                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: "150px",
                    display: "block",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )}

            <button type="submit" disabled={uploadingProfileImage}>
              {uploadingProfileImage
                ? "Uploading..."
                : profileId
                ? "Update Profile"
                : "Save Profile"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowProfileForm(false);
                setSelectedProfileImage(null);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* PROJECT FORM */}

      {showProjectForm && (
        <div className="project-form">
          <h2>{editingProjectId ? "Edit Project" : "Add New Project"}</h2>

          <form
            onSubmit={
              editingProjectId ? handleUpdateProject : handleAddProject
            }
          >
            <input
              type="text"
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <input
              type="text"
              placeholder="Technology Used"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
            />

            <input
              type="text"
              placeholder="GitHub Link"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />

            <input
              type="text"
              placeholder="Live Demo Link"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
            />

            <label>Project Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleProjectImageSelect}
            />

            {selectedProjectImage && (
              <p>Selected: {selectedProjectImage.name}</p>
            )}

            {projectImage && !selectedProjectImage && (
              <div>
                <p>Current Project Image:</p>

                <img
                  src={projectImage}
                  alt={name}
                  style={{
                    width: "200px",
                    display: "block",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )}

            <button type="submit" disabled={uploadingProjectImage}>
              {uploadingProjectImage
                ? "Uploading..."
                : editingProjectId
                ? "Update Project"
                : "Save Project"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowProjectForm(false);
                setEditingProjectId(null);
                setSelectedProjectImage(null);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* PROJECT LIST */}

      {showProjects && (
        <div className="projects-list">
          <h2>Manage Projects</h2>

          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="project-item">
                <h3>{project.name}</h3>

                <p>{project.description}</p>

                <p>
                  <strong>Technology:</strong> {project.technology}
                </p>

                {project.image && (
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{
                      width: "200px",
                      marginTop: "10px",
                      display: "block",
                    }}
                  />
                )}

                {project.github_link && (
                  <p>GitHub: {project.github_link}</p>
                )}

                {project.live_link && <p>Live Demo: {project.live_link}</p>}

                <button onClick={() => handleEditProject(project)}>
                  Edit
                </button>

                <button onClick={() => handleDeleteProject(project.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* CERTIFICATE FORM */}

      {showCertificateForm && (
        <div className="certificate-form">
          <h2>
            {editingCertificateId
              ? "Edit Certificate"
              : "Add New Certificate"}
          </h2>

          <form
            onSubmit={
              editingCertificateId
                ? handleUpdateCertificate
                : handleAddCertificate
            }
          >
            <input
              type="text"
              placeholder="Certificate Name"
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Issuing Organization"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
            />

            <input
              type="text"
              placeholder="Certificate Date"
              value={certificateDate}
              onChange={(e) => setCertificateDate(e.target.value)}
            />

            <input
              type="text"
              placeholder="Certificate Link"
              value={certificateLink}
              onChange={(e) => setCertificateLink(e.target.value)}
            />

            <label>Certificate Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
            />

            {selectedImage && <p>Selected: {selectedImage.name}</p>}

            {certificateImage && !selectedImage && (
              <p>Current Image: {certificateImage}</p>
            )}

            <button type="submit" disabled={uploadingImage}>
              {uploadingImage
                ? "Uploading..."
                : editingCertificateId
                ? "Update Certificate"
                : "Save Certificate"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowCertificateForm(false);
                setEditingCertificateId(null);
                setSelectedImage(null);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* CERTIFICATE LIST */}

      {showCertificates && (
        <div className="certificates-list">
          <h2>Manage Certificates</h2>

          {certificates.length === 0 ? (
            <p>No certificates found.</p>
          ) : (
            certificates.map((certificate) => (
              <div key={certificate.id} className="certificate-item">
                <h3>{certificate.name}</h3>

                <p>
                  <strong>Issuer:</strong> {certificate.issuer}
                </p>

                <p>
                  <strong>Date:</strong> {certificate.date}
                </p>

                {certificate.image && (
                  <img
                    src={certificate.image}
                    alt={certificate.name}
                    style={{
                      width: "200px",
                      marginTop: "10px",
                      display: "block",
                    }}
                  />
                )}

                {certificate.certificate_link && (
                  <p>Certificate Link: {certificate.certificate_link}</p>
                )}

                <button onClick={() => handleEditCertificate(certificate)}>
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteCertificate(certificate.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* SKILL FORM */}

      {showSkillForm && (
        <div className="skill-form">
          <h2>{editingSkillId ? "Edit Skill" : "Add New Skill"}</h2>

          <form
            onSubmit={editingSkillId ? handleUpdateSkill : handleAddSkill}
          >
            <input
              type="text"
              placeholder="Skill Name"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Skill Level"
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
            />

            <select
              value={skillCategory}
              onChange={(e) => setSkillCategory(e.target.value)}
              required
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Tools">Tools</option>
            </select>

            <button type="submit">
              {editingSkillId ? "Update Skill" : "Save Skill"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowSkillForm(false);
                setEditingSkillId(null);
                setSkillName("");
                setSkillLevel("");
                setSkillCategory("Frontend");
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* SKILL LIST */}

      {showSkills && (
        <div className="skills-list">
          <h2>Manage Skills</h2>

          {skills.length === 0 ? (
            <p>No skills found.</p>
          ) : (
            skills.map((skill) => (
              <div key={skill.id} className="skill-item">
                <h3>{skill.name}</h3>

                <p>
                  <strong>Level:</strong> {skill.level}
                </p>

                <p>
                  <strong>Category:</strong> {skill.category}
                </p>

                <button onClick={() => handleEditSkill(skill)}>Edit</button>

                <button onClick={() => handleDeleteSkill(skill.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* MANAGE IMAGES */}

      {showImages && (
        <div className="images-list">
          <h2>Manage Images</h2>

          {images.length === 0 ? (
            <p>No images found.</p>
          ) : (
            images.map((image) => (
              <div
                key={image.filename}
                className="image-item"
                style={{
                  marginBottom: "20px",
                  padding: "15px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={image.url}
                  alt={image.filename}
                  style={{
                    width: "200px",
                    maxHeight: "200px",
                    objectFit: "contain",
                    display: "block",
                    marginBottom: "10px",
                  }}
                />

                <p>
                  <strong>File:</strong> {image.filename}
                </p>

                <button onClick={() => handleDeleteImage(image.filename)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
