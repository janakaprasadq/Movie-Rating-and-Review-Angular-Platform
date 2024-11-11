const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  const { genre } = req.body;
  console.log("Genre Data:", genre);
  db.query(
    "INSERT INTO genres (genre_name) VALUES (?)",
    [genre],
    (error, results) => {
      if (error) {
        console.error("Error adding genre:", error);
        return res.status(500).json({ message: "Error adding genre" });
      }
      res.status(201).json({
        message: "Genre added successfully",
        genre: { name: genre, id: results.insertId },
      });
    }
  );
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM genres";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching genres:", err);
      return res.status(500).json({ message: "Error fetching genres" });
    }
    res.status(200).json(results);
    console.log(results);
  });
});

module.exports = router;
