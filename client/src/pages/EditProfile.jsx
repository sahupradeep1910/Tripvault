import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setName(response.data.name || "");
        setUsername(response.data.username || "");
        setBio(response.data.bio || "");
      } catch (error) {
        console.error("FETCH PROFILE ERROR:", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      setSaving(true);
      setError("");

      await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");

      navigate(`/profile/${username}`);
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Profile ✏️</h1>

      {error && <p>{error}</p>}

      <p>
        <strong>Name:</strong> {name}
      </p>

      <p>
        <strong>Username:</strong> @{username}
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Bio
        </label>

        <br />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell something about yourself..."
          rows="5"
          style={{
            width: "100%",
            maxWidth: "500px",
            marginTop: "10px",
            padding: "10px",
          }}
        />

        <br /><br />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProfile;