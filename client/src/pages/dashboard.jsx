
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TripForm from "../components/TripForm";
import TripCard from "../components/TripCard";
import API_BASE_URL from "../api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [showTripForm, setShowTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [notification, setNotification] = useState(null);
  const [deletingTripId, setDeletingTripId] = useState(null);

  const navigate = useNavigate();

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3500);

    return () => clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    const fetchUserAndTrips = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const userResponse = await axios.get(
          `${API_BASE_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(userResponse.data);

        const tripsResponse = await axios.get(
          `${API_BASE_URL}/api/trips`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTrips(tripsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        } else {
          showNotification(
            error.response?.data?.message ||
              "Failed to load dashboard. Please try again.",
            "error"
          );
        }
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchUserAndTrips();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handleDelete = async (tripId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingTripId(tripId);

      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_BASE_URL}/api/trips/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTrips((prevTrips) =>
        prevTrips.filter((trip) => trip._id !== tripId)
      );

      showNotification("Trip deleted successfully!");
    } catch (error) {
      console.error("Error deleting trip:", error);

      showNotification(
        error.response?.data?.message ||
          "Failed to delete trip. Please try again.",
        "error"
      );
    } finally {
      setDeletingTripId(null);
    }
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setShowTripForm(true);
  };

  if (loadingTrips && !user) {
    return (
      <main className="tv-dashboard">
        <p className="tv-loading" role="status">
          Loading your dashboard...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="tv-dashboard">
        <p className="tv-error" role="alert">
          Unable to load your account.
        </p>
        <button
          className="tv-primary-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="tv-dashboard">
      {notification && (
        <div
          className={`tv-toast tv-toast-${notification.type}`}
          role={notification.type === "error" ? "alert" : "status"}
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

      <section className="tv-welcome">
        <p className="tv-eyebrow">YOUR TRAVEL JOURNAL</p>
        <h1>Welcome, {user.name}! 👋</h1>
        <p className="tv-email">{user.email}</p>

        <div className="tv-profile-actions">
          <button
            className="tv-secondary-btn"
            onClick={() => navigate(`/profile/${user.username}`)}
          >
            👤 My Profile
          </button>

          <button
            className="tv-secondary-btn"
            onClick={() => navigate("/edit-profile")}
          >
            ✏️ Edit Profile
          </button>
        </div>
      </section>

      <section className="tv-trips-section">
        <div className="tv-trips-header">
          <div>
            <h2>Your Trips ✈️</h2>
            <p>Keep your favourite travel memories together.</p>
          </div>

          <button
            className="tv-primary-btn"
            onClick={() => {
              setEditingTrip(null);
              setShowTripForm((previous) => !previous);
            }}
          >
            {showTripForm ? "Close Form" : "＋ Create New Trip"}
          </button>
        </div>

        {showTripForm && (
          <div className="tv-trip-form-wrapper">
            <TripForm
              editingTrip={editingTrip}
              onTripCreated={(newTrip) => {
                setTrips((previous) => [newTrip, ...previous]);
                setShowTripForm(false);
                setEditingTrip(null);
                showNotification("Trip created successfully!");
              }}
              onTripUpdated={(updatedTrip) => {
                setTrips((previous) =>
                  previous.map((trip) =>
                    trip._id === updatedTrip._id
                      ? updatedTrip
                      : trip
                  )
                );

                setEditingTrip(null);
                setShowTripForm(false);
                showNotification("Trip updated successfully!");
              }}
              onCancelEdit={() => {
                setEditingTrip(null);
                setShowTripForm(false);
              }}
            />
          </div>
        )}

        {loadingTrips ? (
          <p className="tv-loading" role="status">
            Loading trips...
          </p>
        ) : trips.length === 0 ? (
          <div className="tv-empty-state">
            <div className="tv-empty-icon">🌍</div>
            <h3>Your journey starts here!</h3>
            <p>
              You haven't added any trips yet. Create your first
              trip and start saving your travel memories.
            </p>
            <button
              className="tv-primary-btn"
              onClick={() => {
                setEditingTrip(null);
                setShowTripForm(true);
              }}
            >
              ＋ Add Your First Trip
            </button>
          </div>
        ) : (
          <div className="tv-trip-grid">
            {trips.map((trip) => (
              <div key={trip._id} className="tv-trip-item">
                <TripCard
                  trip={trip}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

                {deletingTripId === trip._id && (
                  <p className="tv-loading" role="status">
                    Deleting trip...
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
