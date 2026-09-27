import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TripForm from "../components/TripForm";
import TripCard from "../components/TripCard";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [showTripForm, setShowTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndTrips = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Fetch logged-in user
        const userResponse = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(userResponse.data);

        // Fetch user's trips
        const tripsResponse = await axios.get(
          "http://localhost:5000/api/trips",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTrips(tripsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);

        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchUserAndTrips();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // DELETE TRIP
  const handleDelete = async (tripId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/trips/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove deleted trip from the UI
      setTrips((prevTrips) =>
        prevTrips.filter((trip) => trip._id !== tripId)
      );
    } catch (error) {
      console.error("Error deleting trip:", error);

      alert(
        error.response?.data?.message || "Failed to delete trip"
      );
    }
  };

  // EDIT TRIP
  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setShowTripForm(true);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>TripVault</h1>

      <h2>Welcome, {user.name}! 👋</h2>

      <p>Email: {user.email}</p>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h2>Your Trips</h2>

      <button
        onClick={() => {
          setEditingTrip(null);
          setShowTripForm(!showTripForm);
        }}
      >
        {showTripForm ? "Close Form" : "➕ Create New Trip"}
      </button>

      {showTripForm && (
        <TripForm
          editingTrip={editingTrip}
          
          // CREATE SUCCESS
          onTripCreated={(newTrip) => {
            setTrips((prevTrips) => [newTrip, ...prevTrips]);
            setShowTripForm(false);
            setEditingTrip(null);
          }}

          // UPDATE SUCCESS
          onTripUpdated={(updatedTrip) => {
            setTrips((prevTrips) =>
              prevTrips.map((trip) =>
                trip._id === updatedTrip._id
                  ? updatedTrip
                  : trip
              )
            );

            setEditingTrip(null);
            setShowTripForm(false);
          }}

          // CANCEL EDIT
          onCancelEdit={() => {
            setEditingTrip(null);
            setShowTripForm(false);
          }}
        />
      )}

      {loadingTrips ? (
        <p>Loading trips...</p>
      ) : trips.length === 0 ? (
        <p>
          You have no trips yet. Start adding your travel memories! ✈️
        </p>
      ) : (
        <div>
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;