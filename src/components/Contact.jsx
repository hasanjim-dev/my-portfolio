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
} from "react-icons/fa6";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://my-portfolio-backend-u8gq.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    const data = await response.json();

    alert(data.message);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact">
      <div className="contact-content">
        <div className="contact-left">
          <h2>
            Let's Build <br />
            <span className="highlight">Something Iconic</span>
          </h2>

          <p>
            If you want to work with me or know more about my projects,
            feel free to reach out!
          </p>

          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">
                <FaEnvelope />
              </span>
              <div>
                <p className="info-label">EMAIL</p>
                <p className="info-value">hasanjim2345@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">
                <FaWhatsapp />
              </span>
              <div>
                <p className="info-label">WHATSAPP</p>
                <p className="info-value">+880 1823137360</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">
                <FaLocationDot />
              </span>
              <div>
                <p className="info-label">LOCATION</p>
                <p className="info-value">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="find-me">
            <p className="find-me-label">FIND ME ON</p>
            <div className="social-row">
              <a href="#" target="_blank" rel="noreferrer"><FaGithub /></a>
              <a href="#" target="_blank" rel="noreferrer"><FaLinkedin /></a>
              <a href="mailto:hasanjim2345@gmail.com"><FaEnvelope /></a>
              <a href="#" target="_blank" rel="noreferrer"><FaDiscord /></a>
              <a href="#" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
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
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-right">
          <div className="orbit-circle">
            <span className="orbit-icon orbit-icon-1"><FaEnvelope /></span>
            <span className="orbit-icon orbit-icon-2"><FaDiscord /></span>
            <span className="orbit-icon orbit-icon-3"><FaGithub /></span>
            <span className="orbit-icon orbit-icon-4"><FaLinkedin /></span>
            <span className="orbit-icon orbit-icon-5"><FaPhone /></span>
            <span className="orbit-center"><FaLocationDot /></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;