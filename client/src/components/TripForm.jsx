
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";

function TripForm({
  onTripCreated,
  editingTrip,
  onTripUpdated,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    rating: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      setImage(null);
      setError("");
    }
  }, [editingTrip]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setImage(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB");
      setImage(null);
      e.target.value = "";
      return;
    }

    setError("");
    setImage(selectedFile);
  };

  const uploadImage = async (tripId, token) => {
    if (!image) return null;

    const imageData = new FormData();
    imageData.append("image", image);

    const response = await axios.post(
      `${API_BASE_URL}/api/trips/${tripId}/upload`,
      imageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.trip;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      let trip;

      const payload = {
        ...formData,
        rating: formData.rating
          ? Number(formData.rating)
          : undefined,
      };

      if (editingTrip) {
        const response = await axios.put(
          `${API_BASE_URL}/api/trips/${editingTrip._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        trip = response.data.trip;

        if (image) {
          trip = await uploadImage(trip._id, token);
        }

        onTripUpdated(trip);
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/api/trips`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        trip = response.data.trip;

        if (image) {
          trip = await uploadImage(trip._id, token);
        }

        onTripCreated(trip);
      }

      setFormData({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        description: "",
        rating: "",
      });

      setImage(null);
      e.target.reset();
    } catch (error) {
      console.error("Trip form error:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="tv-trip-form" onSubmit={handleSubmit}>
      <div className="tv-trip-form-heading">
        <div className="tv-trip-form-icon">
          {editingTrip ? "✏️" : "✈️"}
        </div>

        <div>
          <p className="tv-trip-form-eyebrow">
            YOUR TRAVEL JOURNAL
          </p>

          <h2>
            {editingTrip ? "Edit Your Trip" : "Create a New Trip"}
          </h2>

          <p className="tv-trip-form-subtitle">
            {editingTrip
              ? "Update the details of your adventure."
              : "Capture your journey and keep your memories alive."}
          </p>
        </div>
      </div>

      {error && (
        <div className="tv-trip-form-error" role="alert">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="tv-trip-form-grid">
        <div className="tv-trip-field">
          <label htmlFor="trip-title">Trip Title *</label>
          <input
            id="trip-title"
            type="text"
            name="title"
            placeholder="e.g. My Goa Adventure"
            value={formData.title}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>

        <div className="tv-trip-field">
          <label htmlFor="trip-destination">Destination *</label>
          <input
            id="trip-destination"
            type="text"
            name="destination"
            placeholder="e.g. Goa, India"
            value={formData.destination}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>

        <div className="tv-trip-field">
          <label htmlFor="trip-start-date">Start Date</label>
          <input
            id="trip-start-date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="tv-trip-field">
          <label htmlFor="trip-end-date">End Date</label>
          <input
            id="trip-end-date"
            type="date"
            name="endDate"
            value={formData.endDate}
            min={formData.startDate || undefined}
            onChange={handleChange}
          />
        </div>

        <div className="tv-trip-field tv-trip-field-full">
          <label htmlFor="trip-description">
            Travel Memories
          </label>

          <textarea
            id="trip-description"
            name="description"
            placeholder="Tell us about your experience, favourite places and special memories..."
            value={formData.description}
            onChange={handleChange}
            rows={5}
            maxLength={2000}
          />

          <span className="tv-trip-field-hint">
            Share the highlights of your journey.
          </span>
        </div>

        <div className="tv-trip-field tv-trip-field-full">
          <label htmlFor="trip-rating">Rate Your Experience</label>

          <select
            id="trip-rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value="">Choose your rating</option>
            <option value="1">⭐ — Not great</option>
            <option value="2">⭐⭐ — It was okay</option>
            <option value="3">⭐⭐⭐ — Good experience</option>
            <option value="4">⭐⭐⭐⭐ — Amazing trip</option>
            <option value="5">⭐⭐⭐⭐⭐ — Unforgettable!</option>
          </select>
        </div>

        <div className="tv-trip-field tv-trip-field-full">
          <label htmlFor="trip-photo">Trip Photo</label>

          <div className="tv-trip-upload">
            <div className="tv-trip-upload-icon">📸</div>

            <div className="tv-trip-upload-copy">
              <strong>
                {image ? "Photo selected!" : "Add a travel photo"}
              </strong>

              <span>
                {image
                  ? image.name
                  : "JPG, PNG or WEBP · Maximum 5 MB"}
              </span>
            </div>

            <label
              htmlFor="trip-photo"
              className="tv-trip-upload-button"
            >
              {image ? "Change photo" : "Choose photo"}
            </label>

            <input
              id="trip-photo"
              className="tv-trip-file-input"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>

      <div className="tv-trip-form-actions">
        {editingTrip && (
          <button
            className="tv-trip-cancel-button"
            type="button"
            onClick={onCancelEdit}
            disabled={loading}
          >
            Cancel
          </button>
        )}

        <button
          className="tv-trip-submit-button"
          type="submit"
          disabled={loading}
        >
          {loading
            ? editingTrip
              ? "Updating your trip..."
              : "Creating your trip..."
            : editingTrip
            ? "✓ Save Changes"
            : "✈ Create My Trip"}
        </button>
      </div>

      <p className="tv-trip-form-footer">
        Your adventures, beautifully remembered. 💙
      </p>
    </form>
  );
}

export default TripForm;
