import { useEffect, useState } from "react";
import axios from "axios";

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

      setImage(null);
    }
  }, [editingTrip]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Select image
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setImage(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB");
      setImage(null);
      return;
    }

    setError("");
    setImage(selectedFile);

    console.log("📸 IMAGE SELECTED:", selectedFile.name);
    console.log("📦 IMAGE SIZE:", selectedFile.size);
    console.log("📝 IMAGE TYPE:", selectedFile.type);
  };

  // Upload image to backend -> Cloudinary
  const uploadImage = async (tripId, token) => {
    if (!image) {
      console.log("❌ NO IMAGE SELECTED");
      return null;
    }

    console.log("📸 IMAGE SELECTED:", image.name);
    console.log("🆔 TRIP ID:", tripId);
    console.log("🚀 SENDING IMAGE TO BACKEND...");

    const imageData = new FormData();
    imageData.append("image", image);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/trips/${tripId}/upload`,
        imageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ UPLOAD RESPONSE:", response.data);
      console.log(
        "🖼️ COVER IMAGE:",
        response.data.trip?.coverImage
      );
      console.log(
        "📷 PHOTOS:",
        response.data.trip?.photos
      );

      return response.data.trip;
    } catch (error) {
      console.error("❌ FRONTEND UPLOAD ERROR:", error);
      console.error(
        "❌ SERVER RESPONSE:",
        error.response?.data
      );

      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      let trip;

      if (editingTrip) {
        // UPDATE TRIP
        console.log("✏️ Updating trip...");

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

        trip = response.data.trip;

        console.log("✅ TRIP UPDATED:", trip);

        // Upload new image if selected
        if (image) {
          console.log("📸 Uploading new image...");
          trip = await uploadImage(trip._id, token);
        }

        console.log("🎉 FINAL TRIP:", trip);

        onTripUpdated(trip);
      } else {
        // CREATE TRIP
        console.log("➕ Creating new trip...");

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

        trip = response.data.trip;

        console.log("✅ TRIP CREATED:", trip);

        // Upload image after trip is created
        if (image) {
          console.log("📸 Uploading trip image...");
          trip = await uploadImage(trip._id, token);
        }

        console.log("🎉 FINAL TRIP:", trip);

        onTripCreated(trip);
      }

      // Reset form
      setFormData({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        description: "",
        rating: "",
      });

      setImage(null);
    } catch (error) {
      console.error("❌ TRIP FORM ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {editingTrip
          ? "Edit Trip ✏️"
          : "Create New Trip ✈️"}
      </h2>

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

      {/* PHOTO UPLOAD */}
      <label>Trip Photo</label>

      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleImageChange}
      />

      {image && (
        <p>
          Selected image: <strong>{image.name}</strong>
        </p>
      )}

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