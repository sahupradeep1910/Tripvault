
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trips");
const profileRoutes = require("./routes/profile");

const app = express();

const allowedOrigins = [
  "https://tripvault-chi.vercel.app",
  "http://localhost:5173",
];

// CORS configuration — keep this before routes
const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Handle JSON request bodies
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/users", profileRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("TripVault Server is Running");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
