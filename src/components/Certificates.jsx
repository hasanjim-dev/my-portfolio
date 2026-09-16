import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaCertificate } from "react-icons/fa";

function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetch("http://   https://my-portfolio-backend-u8gq.onrender.com/certificates")
      .then((response) => response.json())
      .then((data) => {
        setCertificates(data);
      })
      .catch((error) => {
        console.log("Certificates loading error:", error);
      });
  }, []);

  return (
    <section id="certificates">
      <div className="certificates-content">
        <h2>My Certificates</h2>
        {certificates.length === 0 ? (
          <p>No certificates found.</p>
        ) : (
          <div className="certificates-list">
            {certificates.map((certificate) => (
              <div className="certificate-card" key={certificate.id}>
                {certificate.image && (
                  <div className="certificate-image-wrap">
                    <img src={certificate.image} alt={certificate.name} />
                  </div>
                )}
                <div className="certificate-badge">
                  <FaCertificate /> Certificate
                </div>
                <h3>{certificate.name}</h3>
                {certificate.issuer && (
                  <p><strong>Issuer:</strong> {certificate.issuer}</p>
                )}
                {certificate.date && (
                  <p><strong>Date:</strong> {certificate.date}</p>
                )}
                {certificate.certificate_link && (
                  <a href={certificate.certificate_link} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Certificates;
