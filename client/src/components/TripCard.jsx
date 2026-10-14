
import { useNavigate } from "react-router-dom";

function TripCard({ trip, onDelete, onEdit }) {
  const navigate = useNavigate();

  return (
    <div className="tv-trip-card">
      {trip.coverImage && (
        <img
          className="tv-trip-card-image"
          src={trip.coverImage}
          alt={trip.title}
        />
      )}

      <div className="tv-trip-card-content">
        <h3 className="tv-trip-card-title">{trip.title}</h3>

        <p className="tv-trip-card-info">
          <strong>📍 Destination:</strong> {trip.destination}
        </p>

        <div className="tv-trip-card-dates">
          <p className="tv-trip-card-info">
            <strong>🗓️ Start:</strong>{" "}
            {trip.startDate
              ? new Date(trip.startDate).toLocaleDateString()
              : "Not specified"}
          </p>

          <p className="tv-trip-card-info">
            <strong>🗓️ End:</strong>{" "}
            {trip.endDate
              ? new Date(trip.endDate).toLocaleDateString()
              : "Not specified"}
          </p>
        </div>

        <p className="tv-trip-card-info">
          <strong>⭐ Rating:</strong>{" "}
          {trip.rating ? `${trip.rating}/5` : "Not rated"}
        </p>

        {trip.description && (
          <p className="tv-trip-card-description">
            {trip.description}
          </p>
        )}

        <div className="tv-trip-card-actions">
          <button
            type="button"
            className="tv-trip-btn tv-trip-btn-view"
            onClick={() => navigate(`/trips/${trip._id}`)}
          >
            📸 View Details
          </button>

          <button
            type="button"
            className="tv-trip-btn tv-trip-btn-edit"
            onClick={() => onEdit(trip)}
          >
            ✏️ Edit
          </button>

          <button
            type="button"
            className="tv-trip-btn tv-trip-btn-delete"
            onClick={() => onDelete(trip._id)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
