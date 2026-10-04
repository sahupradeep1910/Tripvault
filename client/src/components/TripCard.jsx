import { useNavigate } from "react-router-dom";

function TripCard({ trip, onDelete, onEdit }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "15px 0",
        borderRadius: "8px",
      }}
    >
      {/* COVER IMAGE */}
      {trip.coverImage && (
        <img
          src={trip.coverImage}
          alt={trip.title}
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "220px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
      )}

      <h3>{trip.title}</h3>

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
        {trip.rating ? `${trip.rating}/5 ⭐` : "Not rated"}
      </p>

      {trip.description && (
        <p>
          <strong>Description:</strong> {trip.description}
        </p>
      )}

      {/* VIEW DETAILS */}
      <button
        onClick={() => navigate(`/trips/${trip._id}`)}
      >
        📸 View Details
      </button>

      {/* EDIT */}
      <button
        onClick={() => onEdit(trip)}
        style={{ marginLeft: "10px" }}
      >
        ✏️ Edit
      </button>

      {/* DELETE */}
      <button
        onClick={() => onDelete(trip._id)}
        style={{ marginLeft: "10px" }}
      >
        🗑️ Delete
      </button>
    </div>
  );
}

export default TripCard;