const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trips");
const profileRoutes = require("./routes/profile");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/users", profileRoutes);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  console.error("ERROR MESSAGE:", err?.message);
  console.error("ERROR STACK:", err?.stack);

  res.status(err?.statusCode || 500).json({
    message: err?.message || "Internal Server Error",
  });
});

app.get("/", (req, res) => {
  res.send("TripVault Server is Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });