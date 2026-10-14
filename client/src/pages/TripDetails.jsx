
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../api";

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/trips/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTrip(response.data);
      } catch (err) {
        console.error("Error fetching trip:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load trip. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id, navigate]);

  if (loading) {
    return (
      <main style={styles.messagePage}>
        <p style={styles.messageText}>Loading trip...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={styles.messagePage}>
        <p style={styles.errorText}>{error}</p>
        <button
          type="button"
          style={styles.button}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </main>
    );
  }

  if (!trip) {
    return (
      <main style={styles.messagePage}>
        <p style={styles.messageText}>Trip not found.</p>
        <button
          type="button"
          style={styles.button}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <button
          type="button"
          style={styles.button}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <h1 style={styles.title}>{trip.title}</h1>

        <section style={styles.detailsCard}>
          <p style={styles.detail}>
            <strong>Destination:</strong>{" "}
            {trip.destination || "Not specified"}
          </p>

          <p style={styles.detail}>
            <strong>Start Date:</strong>{" "}
            {trip.startDate
              ? new Date(trip.startDate).toLocaleDateString()
              : "Not specified"}
          </p>

          <p style={styles.detail}>
            <strong>End Date:</strong>{" "}
            {trip.endDate
              ? new Date(trip.endDate).toLocaleDateString()
              : "Not specified"}
          </p>

          <p style={styles.detail}>
            <strong>Rating:</strong>{" "}
            {trip.rating ? `${trip.rating}/5 ⭐` : "Not rated"}
          </p>

          {trip.description && (
            <p style={styles.description}>
              <strong>Description:</strong> {trip.description}
            </p>
          )}
        </section>

        {trip.coverImage && (
          <section style={styles.section}>
            <h2 style={styles.heading}>Cover Photo</h2>

            <img
              src={trip.coverImage}
              alt={`${trip.title} cover`}
              style={styles.coverImage}
            />
          </section>
        )}

        <section style={styles.section}>
          <h2 style={styles.heading}>Trip Photos 📸</h2>

          {trip.photos?.length > 0 ? (
            <div style={styles.photoGrid}>
              {trip.photos.map((photo, index) => (
                <img
                  key={`${photo}-${index}`}
                  src={photo}
                  alt={`${trip.title} photo ${index + 1}`}
                  loading="lazy"
                  style={styles.photo}
                />
              ))}
            </div>
          ) : (
            <p style={styles.emptyState}>
              No photos uploaded yet.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: "clamp(14px, 3vw, 30px)",
    background: "#f1f5f9",
    color: "#1e293b",
    overflowWrap: "anywhere",
  },

  container: {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    boxSizing: "border-box",
    minWidth: 0,
  },

  title: {
    color: "#173b6c",
    fontSize: "clamp(1.7rem, 5vw, 2.5rem)",
    lineHeight: 1.2,
    margin: "24px 0 18px",
    overflowWrap: "anywhere",
  },

  detailsCard: {
    padding: "clamp(14px, 3vw, 22px)",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    boxSizing: "border-box",
    width: "100%",
  },

  detail: {
    color: "#334155",
    fontSize: "1rem",
    lineHeight: 1.7,
    margin: "8px 0",
    overflowWrap: "anywhere",
  },

  description: {
    color: "#334155",
    lineHeight: 1.7,
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },

  section: {
    marginTop: "30px",
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
  },

  heading: {
    color: "#1e293b",
    fontSize: "clamp(1.25rem, 4vw, 1.65rem)",
    fontWeight: 750,
    lineHeight: 1.3,
    margin: "0 0 15px",
    overflowWrap: "anywhere",
  },

  coverImage: {
    display: "block",
    width: "100%",
    maxWidth: "650px",
    height: "clamp(190px, 55vw, 360px)",
    objectFit: "cover",
    borderRadius: "12px",
    background: "#e2e8f0",
  },

  photoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px",
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
  },

  photo: {
    display: "block",
    width: "100%",
    minWidth: 0,
    height: "clamp(115px, 32vw, 220px)",
    objectFit: "cover",
    borderRadius: "10px",
    background: "#e2e8f0",
  },

  emptyState: {
    padding: "18px",
    color: "#475569",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    lineHeight: 1.6,
  },

  button: {
    display: "inline-block",
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: "11px 16px",
    border: "none",
    borderRadius: "9px",
    background: "#245fce",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },

  messagePage: {
    width: "100%",
    minHeight: "50vh",
    boxSizing: "border-box",
    padding: "24px 16px",
    textAlign: "center",
    overflowWrap: "anywhere",
    color: "#1e293b",
  },

  messageText: {
    fontSize: "1rem",
    color: "#334155",
  },

  errorText: {
    fontSize: "1rem",
    color: "#b91c1c",
    marginBottom: "18px",
  },
};

export default TripDetails;
