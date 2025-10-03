const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Routes
app.use("/api/users", userRoutes);

// Home route for learning modules
app.get("/", (req, res) => {
  res.json({
    module: "Non-relational Databases and MongoDB",
    items: [
      "Introduction to NoSQL Databases",
      "Basics of Document-Based Databases",
      "Set Up MongoDB Environment for NoSQL",
      "Insert and Find Documents",
      "Query Documents and Query Operators",
      "Query Arrays and Nested Documents",
      "Update and Delete Documents",
      "Connecting to Mongoose Driver in Backend"
    ]
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
