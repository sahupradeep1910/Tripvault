import { useEffect, useState } from "react";
import axios from "axios";

function TripForm({ onTripCreated, editingTrip, onTripUpdated, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fill form when editing a trip
  useEffect(() => {
    if (editingTrip) {
      setFormData({
        title: editingTrip.title || "",
        destination: editingTrip.destination || "",
        startDate: editingTrip.startDate
          ? editingTrip.startDate.split("T")[0]
          : "",
        endDate: editingTrip.endDate
          ? editingTrip.endDate.split("T")[0]
          : "",
        description: editingTrip.description || "",
        rating: editingTrip.rating || "",
      });
    }
  }, [editingTrip]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (editingTrip) {
        // UPDATE TRIP
        const response = await axios.put(
          `http://localhost:5000/api/trips/${editingTrip._id}`,
          {
            ...formData,
            rating: formData.rating
              ? Number(formData.rating)
              : undefined,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        onTripUpdated(response.data.trip);
      } else {
        // CREATE TRIP
        const response = await axios.post(
          "http://localhost:5000/api/trips",
          {
            ...formData,
            rating: formData.rating
              ? Number(formData.rating)
              : undefined,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        onTripCreated(response.data.trip);
      }

      setFormData({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        description: "",
        rating: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingTrip ? "Edit Trip ✏️" : "Create New Trip ✈️"}</h2>

      {error && <p>{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Trip Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
        required
      />

      <label>Start Date</label>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
      />

      <label>End Date</label>
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description / Memories"
        value={formData.description}
        onChange={handleChange}
      />

      <label>Rating</label>
      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
      >
        <option value="">Select Rating</option>
        <option value="1">1 ⭐</option>
        <option value="2">2 ⭐⭐</option>
        <option value="3">3 ⭐⭐⭐</option>
        <option value="4">4 ⭐⭐⭐⭐</option>
        <option value="5">5 ⭐⭐⭐⭐⭐</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading
          ? editingTrip
            ? "Updating..."
            : "Creating..."
          : editingTrip
          ? "Update Trip"
          : "Create Trip"}
      </button>

      {editingTrip && (
        <button
          type="button"
          onClick={onCancelEdit}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default TripForm;