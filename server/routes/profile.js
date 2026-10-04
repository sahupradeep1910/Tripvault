const express = require("express");
const User = require("../models/user");
const Trip = require("../models/Trip");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC PROFILE
// No authentication required
router.get("/:username/profile", async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();

    const user = await User.findOne({ username }).select(
      "name username bio"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const trips = await Trip.find({
      user: user._id,
    })
      .select(
        "title destination startDate endDate description rating coverImage photos"
      )
      .sort({ createdAt: -1 });

    res.json({
      user: {
        name: user.name,
        username: user.username,
        bio: user.bio,
      },
      trips,
    });
  } catch (error) {
    console.error("PUBLIC PROFILE ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// EDIT PROFILE
// Authentication required
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { bio } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.bio = bio ?? user.bio;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        username: user.username,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error("EDIT PROFILE ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;