import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function PublicProfile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${username}/profile`
        );

        setProfile(response.data);
      } catch (error) {
        console.error("PUBLIC PROFILE ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Profile Not Found</h2>
        <p>{error}</p>

        <button onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  if (!profile) {
    return <p>Profile not found.</p>;
  }

  const { user, trips } = profile;

  return (
    <div style={{ padding: "20px" }}>
      
      {/* PROFILE INFO */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h1>{user.name}</h1>

        <p>
          <strong>@{user.username}</strong>
        </p>

        {user.bio ? (
          <p>{user.bio}</p>
        ) : (
          <p>No bio added yet.</p>
        )}
      </div>

      {/* TRIPS */}
      <h2>My Trips ✈️</h2>

      {trips.length === 0 ? (
        <p>No public trips yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
            marginTop: "20px",
          }}
        >
          {trips.map((trip) => (
            <div
              key={trip._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
              }}
            >
              {/* COVER PHOTO */}
              {trip.coverImage && (
                <img
                  src={trip.coverImage}
                  alt={trip.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}

              <h3>{trip.title}</h3>

              <p>
                <strong>Destination:</strong>{" "}
                {trip.destination}
              </p>

              {trip.rating && (
                <p>
                  <strong>Rating:</strong>{" "}
                  {trip.rating}/5 ⭐
                </p>
              )}

              {trip.description && (
                <p>{trip.description}</p>
              )}

              {/* PHOTO GRID */}
              {trip.photos && trip.photos.length > 0 && (
                <div style={{ marginTop: "15px" }}>
                  <h4>Trip Photos 📸</h4>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(3, 1fr)",
                      gap: "8px",
                    }}
                  >
                    {trip.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`${trip.title} ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PublicProfile;