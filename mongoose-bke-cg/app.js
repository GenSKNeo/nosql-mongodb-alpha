// Main entry point for Express server
// app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.static(path.join(__dirname, "public"))); // serve CSS, images

// View engine
app.set("view engine", "ejs");

// Import routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// Home page
// app.get("/", (req, res) => {
//   res.render("index", { title: "Profile Viewer App" });
// });

app.get("/", (req, res) => {
  res.redirect("/users");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
