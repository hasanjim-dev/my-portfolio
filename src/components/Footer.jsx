import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>© {year} Muntasir Hasan Jim. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
