import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
          `http://localhost:5000/api/trips/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTrip(response.data);
      } catch (error) {
        console.error("Error fetching trip:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load trip"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id, navigate]);

  if (loading) {
    return <p>Loading trip...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  if (!trip) {
    return <p>Trip not found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <h1>{trip.title}</h1>

      <p>
        <strong>Destination:</strong> {trip.destination}
      </p>

      <p>
        <strong>Start Date:</strong>{" "}
        {trip.startDate
          ? new Date(trip.startDate).toLocaleDateString()
          : "Not specified"}
      </p>

      <p>
        <strong>End Date:</strong>{" "}
        {trip.endDate
          ? new Date(trip.endDate).toLocaleDateString()
          : "Not specified"}
      </p>

      <p>
        <strong>Rating:</strong>{" "}
        {trip.rating
          ? `${trip.rating}/5 ⭐`
          : "Not rated"}
      </p>

      {trip.description && (
        <p>
          <strong>Description:</strong>{" "}
          {trip.description}
        </p>
      )}

      {/* COVER IMAGE */}
      {trip.coverImage && (
        <div style={{ marginTop: "20px" }}>
          <h2>Cover Photo</h2>

          <img
            src={trip.coverImage}
            alt={trip.title}
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
      )}

      {/* PHOTO GRID */}
      <div style={{ marginTop: "30px" }}>
        <h2>Trip Photos 📸</h2>

        {trip.photos && trip.photos.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            {trip.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${trip.title} ${index + 1}`}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            ))}
          </div>
        ) : (
          <p>No photos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default TripDetails;