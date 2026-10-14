
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../api";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setNotification(null);

    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
      });

      setNotification({
        type: "success",
        message: "Registration successful! Redirecting to login...",
      });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

      setNotification({
        type: "error",
        message:
          error.response?.data?.message ||
          (error.request
            ? "Cannot connect to the server. Please try again."
            : "Registration failed. Please try again."),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="tv-auth-page">
      <section className="tv-auth-card">
        <div className="tv-auth-brand">
          <span className="tv-auth-logo">✈</span>
          <h1>TripVault</h1>
          <p>Your journeys, your memories.</p>
        </div>

        <h2>Create Account</h2>
        <p className="tv-auth-subtitle">
          Join TripVault and start saving your travel memories.
        </p>

        {notification && (
          <div
            className={`tv-auth-toast tv-auth-toast-${notification.type}`}
            role={notification.type === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            <span>{notification.message}</span>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setNotification(null)}
            >
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleRegister} className="tv-auth-form">
          <label htmlFor="register-name">Full Name</label>
          <input
            id="register-name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            disabled={loading}
          />

          <label htmlFor="register-username">Username</label>
          <input
            id="register-username"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            disabled={loading}
          />

          <label htmlFor="register-email">Email Address</label>
          <input
            id="register-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={loading}
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            disabled={loading}
          />

          <button
            className="tv-auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="tv-auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
