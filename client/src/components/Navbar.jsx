import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="tv-navbar">
      <div className="tv-nav-container">
        <Link to="/dashboard" className="tv-brand" onClick={closeMenu}>
          <span className="tv-brand-icon">✈</span>
          <span>TripVault</span>
        </Link>

        <button
          className="tv-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`tv-nav-links ${menuOpen ? "tv-nav-open" : ""}`}>
          <Link to="/dashboard" onClick={closeMenu}>
            Dashboard
          </Link>

          <button
            type="button"
            className="tv-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;