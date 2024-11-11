const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  const { name, biography, birth_date, nationality, image_url } = req.body;

  console.log(req.body); // Log the birth date

  const formattedDateOfBirth = new Date(birth_date).toISOString().split("T")[0];

  console.log("Received actor data:", req.body);

  if (!name || !biography || !birth_date || !nationality || !image_url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `INSERT INTO actors (name, biography, birth_date, nationality,image_url) VALUES (?, ?, ?, ?,?)`;
  db.query(
    sql,
    [name, biography, birth_date, nationality, image_url],
    (err, result) => {
      if (err) {
        console.error("Error inserting actor:", err);

        return res.status(500).json({ error: "Failed to add actor" });
      }
      res.status(201).json({
        message: "Actor added successfully",
        actorId: result.insertId,
      });
    }
  );
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM actors";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching movies:", error);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
    console.log(results);
  });
});

module.exports = router;
