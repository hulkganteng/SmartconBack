const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // Memuat konfigurasi dari file .env

// Import Routes
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const forumRoutes = require("./routes/forumRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/forums", forumRoutes);

// Default Route for Root
app.get("/", (req, res) => {
  res.send("Welcome to Smartcon Backend API");
});

// Handle 404 Errors (Unknown Routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Menampilkan error ke console
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
