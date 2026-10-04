const express = require("express");
const Trip = require("../models/Trip");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// CREATE TRIP
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
    } = req.body;

    if (!title || !destination) {
      return res.status(400).json({
        message: "Title and destination are required",
      });
    }

    const trip = new Trip({
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
      user: req.user.userId,
    });

    await trip.save();

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    console.error("CREATE TRIP ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// GET ALL TRIPS OF LOGGED-IN USER
router.get("/", authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(trips);
  } catch (error) {
    console.error("GET TRIPS ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// UPLOAD TRIP PHOTO
router.post(
  "/:id/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload an image",
        });
      }

      const imageUrl = req.file.path;

      console.log("IMAGE URL:", imageUrl);

      // Verify trip ownership first
      const trip = await Trip.findOne({
        _id: req.params.id,
        user: req.user.userId,
      });

      if (!trip) {
        return res.status(404).json({
          message: "Trip not found or you are not the owner",
        });
      }

      const coverImage = trip.coverImage || imageUrl;

      // Add new photo without removing existing photos
      const updateResult = await Trip.collection.updateOne(
        {
          _id: trip._id,
        },
        {
          $set: {
            coverImage: coverImage,
          },
          $push: {
            photos: imageUrl,
          },
        }
      );

      console.log("MONGODB UPDATE RESULT:", updateResult);

      // Fetch updated document
      const updatedTrip = await Trip.findById(trip._id).lean();

      console.log("UPDATED TRIP:", updatedTrip);

      res.status(200).json({
        message: "Photo uploaded successfully",
        trip: updatedTrip,
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      res.status(500).json({
        message: "Upload failed",
        error: error.message,
      });
    }
  }
);

// GET SINGLE TRIP
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.json(trip);
  } catch (error) {
    console.error("GET SINGLE TRIP ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// UPDATE TRIP
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found or you are not the owner",
      });
    }

    const {
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
    } = req.body;

    trip.title = title ?? trip.title;
    trip.destination = destination ?? trip.destination;
    trip.startDate = startDate ?? trip.startDate;
    trip.endDate = endDate ?? trip.endDate;
    trip.description = description ?? trip.description;
    trip.rating = rating ?? trip.rating;

    await trip.save();

    res.json({
      message: "Trip updated successfully",
      trip,
    });
  } catch (error) {
    console.error("UPDATE TRIP ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// DELETE TRIP
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found or you are not the owner",
      });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TRIP ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;