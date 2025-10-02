// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET all users
router.get("/", userController.getUsers);

// POST create new user
router.post("/", userController.createUser);

module.exports = router;
