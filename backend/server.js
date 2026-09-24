require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();

app.use(cors());
app.use(express.json());


// ==================================================
// CLOUDINARY CONFIG
// ==================================================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// ==================================================
// UPLOAD FOLDER (kept for backward compatibility, unused for new uploads)
// ==================================================

const uploadFolder = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}


// ==================================================
// IMAGE UPLOAD SETUP (NOW USES CLOUDINARY)
// ==================================================

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio",
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});

const upload = multer({
  storage: storage
});


// ==================================================
// MAKE UPLOADS PUBLIC (old local files, if any)
// ==================================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// ==================================================
// MYSQL CONNECTION (POOL)
// ==================================================

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("MySQL connection failed:", err);
  } else {
    console.log("MySQL connected successfully!");
    connection.release();
  }
});


// ==================================================
// HOME / TEST
// ==================================================

app.get("/", (req, res) => {
  res.send("Backend is working!");
});


// ==================================================
// ADMIN LOGIN
// ==================================================

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({
      message: "Login successful!",
      user: {
        username: "admin"
      }
    });
  }

  res.status(401).json({
    message: "Invalid username or password"
  });
});


// ==================================================
// CONTACT
// ==================================================

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql =
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  db.query(
    sql,
    [name, email, message],
    (err) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to save message"
        });
      }

      res.json({
        message: "Your message has been received!"
      });
    }
  );
});


// ==================================================
// PROJECTS
// ==================================================


// ==================================================
// ADD PROJECT
// ==================================================

app.post("/projects", (req, res) => {
  const {
    name,
    description,
    technology,
    github_link,
    live_link,
    image
  } = req.body;

  const sql =
    "INSERT INTO projects (name, description, technology, github_link, live_link, image) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      name,
      description,
      technology,
      github_link,
      live_link,
      image
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to add project"
        });
      }

      res.json({
        message: "Project added successfully!",
        id: result.insertId
      });
    }
  );
});


// ==================================================
// GET ALL PROJECTS
// ==================================================

app.get("/projects", (req, res) => {
  const sql =
    "SELECT * FROM projects ORDER BY id DESC";

  db.query(
    sql,
    (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to load projects"
        });
      }

      res.json(results);
    }
  );
});


// ==================================================
// UPDATE PROJECT
// ==================================================

app.put("/projects/:id", (req, res) => {
  const projectId = req.params.id;

  const {
    name,
    description,
    technology,
    github_link,
    live_link,
    image
  } = req.body;

  const sql =
    "UPDATE projects SET name = ?, description = ?, technology = ?, github_link = ?, live_link = ?, image = ? WHERE id = ?";

  db.query(
    sql,
    [
      name,
      description,
      technology,
      github_link,
      live_link,
      image,
      projectId
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to update project"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Project not found"
        });
      }

      res.json({
        message: "Project updated successfully!"
      });
    }
  );
});


// ==================================================
// DELETE PROJECT
// ==================================================

app.delete("/projects/:id", (req, res) => {
  const projectId = req.params.id;

  const sql =
    "DELETE FROM projects WHERE id = ?";

  db.query(
    sql,
    [projectId],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to delete project"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Project not found"
        });
      }

      res.json({
        message: "Project deleted successfully!"
      });
    }
  );
});


// ==================================================
// CERTIFICATES
// ==================================================


// ==================================================
// ADD CERTIFICATE
// ==================================================

app.post("/certificates", (req, res) => {
  const {
    name,
    issuer,
    date,
    certificate_link,
    image
  } = req.body;

  const sql =
    "INSERT INTO certificates (name, issuer, date, certificate_link, image) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      name,
      issuer,
      date,
      certificate_link,
      image
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to add certificate"
        });
      }

      res.json({
        message: "Certificate added successfully!",
        id: result.insertId
      });
    }
  );
});


// ==================================================
// GET ALL CERTIFICATES
// ==================================================

app.get("/certificates", (req, res) => {
  const sql =
    "SELECT * FROM certificates ORDER BY id DESC";

  db.query(
    sql,
    (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to load certificates"
        });
      }

      res.json(results);
    }
  );
});


// ==================================================
// UPDATE CERTIFICATE
// ==================================================

app.put("/certificates/:id", (req, res) => {
  const certificateId = req.params.id;

  const {
    name,
    issuer,
    date,
    certificate_link,
    image
  } = req.body;

  const sql =
    "UPDATE certificates SET name = ?, issuer = ?, date = ?, certificate_link = ?, image = ? WHERE id = ?";

  db.query(
    sql,
    [
      name,
      issuer,
      date,
      certificate_link,
      image,
      certificateId
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to update certificate"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Certificate not found"
        });
      }

      res.json({
        message: "Certificate updated successfully!"
      });
    }
  );
});


// ==================================================
// DELETE CERTIFICATE
// ==================================================

app.delete("/certificates/:id", (req, res) => {
  const certificateId = req.params.id;

  const sql =
    "DELETE FROM certificates WHERE id = ?";

  db.query(
    sql,
    [certificateId],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to delete certificate"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Certificate not found"
        });
      }

      res.json({
        message: "Certificate deleted successfully!"
      });
    }
  );
});


// ==================================================
// PROFILE
// ==================================================


// ==================================================
// GET PROFILE
// ==================================================

app.get("/profile", (req, res) => {
  const sql =
    "SELECT * FROM profile ORDER BY id DESC LIMIT 1";

  db.query(
    sql,
    (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to load profile"
        });
      }

      if (results.length === 0) {
        return res.json(null);
      }

      res.json(results[0]);
    }
  );
});


// ==================================================
// ADD PROFILE
// ==================================================

app.post("/profile", (req, res) => {
  const {
    name,
    designation,
    introduction,
    profile_image
  } = req.body;

  const sql =
    "INSERT INTO profile (name, designation, introduction, profile_image) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [
      name,
      designation,
      introduction,
      profile_image
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to save profile"
        });
      }

      res.json({
        message: "Profile saved successfully!",
        id: result.insertId
      });
    }
  );
});


// ==================================================
// UPDATE PROFILE
// ==================================================

app.put("/profile/:id", (req, res) => {
  const profileId = req.params.id;

  const {
    name,
    designation,
    introduction,
    profile_image
  } = req.body;

  const sql =
    "UPDATE profile SET name = ?, designation = ?, introduction = ?, profile_image = ? WHERE id = ?";

  db.query(
    sql,
    [
      name,
      designation,
      introduction,
      profile_image,
      profileId
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to update profile"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Profile not found"
        });
      }

      res.json({
        message: "Profile updated successfully!"
      });
    }
  );
});


// ==================================================
// IMAGE UPLOAD (NOW USES CLOUDINARY - PERMANENT STORAGE)
// ==================================================

app.post(
  "/upload",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded"
      });
    }

    const imageUrl = req.file.path;

    res.json({
      message: "Image uploaded successfully!",
      imageUrl: imageUrl
    });
  }
);


// ==================================================
// GET ALL UPLOADED IMAGES (legacy local files only)
// ==================================================

app.get("/images", (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      console.log("Error reading images:", err);

      return res.status(500).json({
        message: "Failed to load images"
      });
    }

    const images = files
      .filter((file) => {
        const filePath = path.join(uploadFolder, file);

        return fs.statSync(filePath).isFile();
      })
      .map((file) => {
        return {
          filename: file,
          url: `${req.protocol}://${req.get("host")}/uploads/${encodeURIComponent(file)}`
        };
      });

    res.json(images);
  });
});


// ==================================================
// DELETE UPLOADED IMAGE (legacy local files only)
// ==================================================

app.delete("/images/:filename", (req, res) => {
  const filename = path.basename(req.params.filename);

  const filePath = path.join(
    uploadFolder,
    filename
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      message: "Image not found"
    });
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Error deleting image:", err);

      return res.status(500).json({
        message: "Failed to delete image"
      });
    }

    res.json({
      message: "Image deleted successfully!"
    });
  });
});


// ==================================================
// SKILLS
// ==================================================


// ==================================================
// ADD SKILL
// ==================================================

app.post("/skills", (req, res) => {
  const { name, level, category } = req.body;

  const sql =
    "INSERT INTO skills (name, level, category) VALUES (?, ?, ?)";

  db.query(
    sql,
    [name, level, category],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to add skill"
        });
      }

      res.json({
        message: "Skill added successfully!",
        id: result.insertId
      });
    }
  );
});


// ==================================================
// GET ALL SKILLS
// ==================================================

app.get("/skills", (req, res) => {
  const sql =
    "SELECT * FROM skills ORDER BY id DESC";

  db.query(
    sql,
    (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to load skills"
        });
      }

      res.json(results);
    }
  );
});


// ==================================================
// UPDATE SKILL
// ==================================================

app.put("/skills/:id", (req, res) => {
  const skillId = req.params.id;

  const { name, level, category } = req.body;

  const sql =
    "UPDATE skills SET name = ?, level = ?, category = ? WHERE id = ?";

  db.query(
    sql,
    [name, level, category, skillId],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to update skill"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Skill not found"
        });
      }

      res.json({
        message: "Skill updated successfully!"
      });
    }
  );
});


// ==================================================
// DELETE SKILL
// ==================================================

app.delete("/skills/:id", (req, res) => {
  const skillId = req.params.id;

  const sql =
    "DELETE FROM skills WHERE id = ?";

  db.query(
    sql,
    [skillId],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Failed to delete skill"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Skill not found"
        });
      }

      res.json({
        message: "Skill deleted successfully!"
      });
    }
  );
});


// ==================================================
// START SERVER
// ==================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});