
import "./Footer.css";

function Footer() {
  return (
    <footer className="tv-footer">
      <p>
        © {new Date().getFullYear()} Pradeep Sahu
      </p>

      <a
        href="https://github.com/sahupradeep1910"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Pradeep Sahu's GitHub profile"
      >
        GitHub Profile ↗
      </a>
    </footer>
  );
}

export default Footer;
