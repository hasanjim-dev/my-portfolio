import { useState } from "react";
import "./Contact.css";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaLocationDot,
  FaDiscord,
  FaPhone,
  FaXTwitter,
  FaRedditAlien,
  FaFacebookF,
  FaGitlab,
  FaInstagram,
} from "react-icons/fa6";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://my-portfolio-backend-u8gq.onrender.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact">
      <div className="contact-content">

        {/* ================= LEFT SIDE ================= */}
        <div className="contact-left">

          <h2>
            Let's Build <br />
            <span className="highlight">Something Iconic</span>
          </h2>

          <p>
            Always eager to take on new challenges and build impactful digital experiences. If you have any idea,
            feel free to reach out!
          </p>

          {/* ================= CONTACT INFO ================= */}
          <div className="contact-info">

            {/* Email */}
            <div className="info-item">
              <span className="info-icon">
                <FaEnvelope />
              </span>

              <div>
                <p className="info-label">EMAIL</p>
                <p className="info-value">
                  hasanjim2345@gmail.com
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="info-item">
              <span className="info-icon">
                <FaWhatsapp />
              </span>

              <div>
                <p className="info-label">WHATSAPP</p>
                <p className="info-value">
                  +880 1823137360
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="info-item">
              <span className="info-icon">
                <FaLocationDot />
              </span>

              <div>
                <p className="info-label">LOCATION</p>
                <p className="info-value">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

          </div>


          {/* ================= FIND ME ON ================= */}
          <div className="find-me">

            <p className="find-me-label">
              FIND ME ON
            </p>

            <div className="social-row">

              {/* GitHub */}
              <a
                href="https://github.com/hasanjim-dev"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>


              {/* GitLab
                  Account not created yet.
                  Add your link later. */}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="GitLab"
              >
                <FaGitlab />
              </a>


              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/muntasir-hasan-jim-1804b643/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>


              {/* Email */}
              <a
                href="mailto:hasanjim2345@gmail.com"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>


              {/* Discord */}
              <a
                href="https://discord.com/users/1065374771417710702"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
              >
                <FaDiscord />
              </a>


              {/* WhatsApp */}
              <a
                href="https://wa.me/8801823137360"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>


              {/* X
                  Account not created yet.
                  Add your link later. */}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
              >
                <FaXTwitter />
              </a>


              {/* Reddit
                  Account not created yet.
                  Add your link later. */}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="Reddit"
              >
                <FaRedditAlien />
              </a>


              {/* Instagram
                  Account not created yet.
                  Add your link later. */}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>


              {/* Facebook
                  Account not created yet.
                  Add your link later. */}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

            </div>
          </div>


          {/* ================= CONTACT FORM ================= */}
          <form
            onSubmit={handleSubmit}
            className="contact-form"
          >

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="contact-right">

          <div className="orbit-circle">

            {/* Outer Orbit Rings */}
            <div className="orbit-ring orbit-ring-1"></div>

            <div className="orbit-ring orbit-ring-2"></div>


            {/* Email */}
            <span className="orbit-icon orbit-icon-1">
              <FaEnvelope />
            </span>


            {/* Discord */}
            <span className="orbit-icon orbit-icon-2">
              <FaDiscord />
            </span>


            {/* GitHub */}
            <span className="orbit-icon orbit-icon-3">
              <FaGithub />
            </span>


            {/* LinkedIn */}
            <span className="orbit-icon orbit-icon-4">
              <FaLinkedin />
            </span>


            {/* Phone */}
            <span className="orbit-icon orbit-icon-5">
              <FaPhone />
            </span>


            {/* Center Location */}
            <span className="orbit-center">
              <FaLocationDot />
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;