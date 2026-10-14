
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!notification.message) return;

    const timer = setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3500);

    return () => clearTimeout(timer);
  }, [notification]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setNotification({
        message: "Please enter your email and password.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      setNotification({ message: "", type: "" });

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email: email.trim(),
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      setNotification({
        message: "Login successful! Welcome to TripVault.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 800);
    } catch (error) {
      setNotification({
        message:
          error.response?.data?.message ||
          "Login failed. Please check your credentials and try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="tv-auth-page">
      {notification.message && (
        <div
          className={`tv-auth-toast ${
            notification.type === "success"
              ? "tv-auth-toast-success"
              : "tv-auth-toast-error"
          }`}
          role="status"
          aria-live="polite"
        >
          <span>
            {notification.type === "success" ? "✓" : "!"}
          </span>
          {notification.message}
        </div>
      )}

      <section className="tv-auth-card">
        <Link to="/login" className="tv-auth-brand">
          <span className="tv-auth-brand-icon">✈</span>
          TripVault
        </Link>

        <div className="tv-auth-heading">
          <p className="tv-auth-eyebrow">YOUR NEXT ADVENTURE STARTS HERE</p>
          <h1>Welcome back!</h1>
          <p>Log in to continue exploring and sharing your journeys.</p>
        </div>

        <form className="tv-auth-form" onSubmit={handleLogin}>
          <div className="tv-auth-field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="tv-auth-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            className="tv-auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login to TripVault"}
          </button>
        </form>

        <div className="tv-auth-divider">
          <span>YOUR JOURNEY AWAITS</span>
        </div>

        <p className="tv-auth-switch">
          Don't have an account?{" "}
          <Link to="/register">Create an account</Link>
        </p>

        <p className="tv-auth-terms">
          Discover places. Save memories. Share adventures.
        </p>
      </section>
    </main>
  );
}

export default Login;
