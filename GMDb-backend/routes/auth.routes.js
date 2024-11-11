// routes/auth.routes.js
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, hashedPassword], (err, result) => {
    if (err) {
      console.error("Error during registration:", err);
      return res.status(500).send("Error registering user");
    }

    // Generate a JWT token after successful registration
    const token = jwt.sign(
      { id: result.insertId, email: email }, // result.insertId gets the inserted user's ID
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: token, // Return the token to the front-end
    });
  });
});

// Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).send("Error fetching user");
    }

    if (results.length === 0) {
      return res.status(400).send("Invalid email or password");
    }

    const user = results[0];

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send("Invalid email or password");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your_secret_key",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({ token });
  });
});

module.exports = router;
