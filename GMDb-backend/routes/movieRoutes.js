// routes/movieRoutes.js

const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  console.log("Received movie data:", req.body);
  const {
    title,
    description,
    release_date,
    duration_minutes,
    poster_url,
    trailer_url,
    genres,
    actors,
  } = req.body;

  if (
    !title ||
    !description ||
    !release_date ||
    !duration_minutes ||
    !poster_url ||
    !trailer_url
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const formattedReleaseDate = new Date(release_date)
    .toISOString()
    .split("T")[0];

  const sqlInsertMovie = `
    INSERT INTO movies 
    (title, description, release_date, duration_minutes, poster_url, trailer_url, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const movieValues = [
    title,
    description,
    formattedReleaseDate,
    duration_minutes,
    poster_url,
    trailer_url,
    new Date(),
  ];

  // Start a transaction to handle multiple inserts
  db.beginTransaction((transactionErr) => {
    if (transactionErr) {
      console.error("Transaction Error:", transactionErr);
      return res.status(500).json({ error: "Database transaction error" });
    }

    // Insert movie into 'movies' table
    db.query(sqlInsertMovie, movieValues, (error, results) => {
      if (error) {
        console.error("Error inserting movie:", error);
        return db.rollback(() => {
          res.status(500).json({ error: "Database error" });
        });
      }

      const movieId = results.insertId; // Get the inserted movie's ID

      // Insert genres into 'movie_genres' table
      const genreInsertPromises = genres.map((genreId) => {
        const sqlInsertGenre = `INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)`;
        return new Promise((resolve, reject) => {
          db.query(sqlInsertGenre, [movieId, genreId], (genreError) => {
            if (genreError) {
              return reject(genreError);
            }
            resolve();
          });
        });
      });

      // Insert actors into 'movie_actors' table
      const actorInsertPromises = actors.map((actorId) => {
        const sqlInsertActor = `INSERT INTO movie_cast (movie_id, actor_id) VALUES (?, ?)`;
        return new Promise((resolve, reject) => {
          db.query(sqlInsertActor, [movieId, actorId], (actorError) => {
            if (actorError) {
              return reject(actorError);
            }
            resolve();
          });
        });
      });

      // Wait for all genre and actor insertions to complete
      Promise.all([...genreInsertPromises, ...actorInsertPromises])
        .then(() => {
          // Commit transaction after successful insertion
          db.commit((commitErr) => {
            if (commitErr) {
              console.error("Commit Error:", commitErr);
              return db.rollback(() => {
                res.status(500).json({ error: "Transaction commit error" });
              });
            }
            res.status(201).json({
              message: "Movie, genres, and actors added successfully",
              movieId: movieId,
            });
          });
        })
        .catch((insertError) => {
          console.error("Insert Error:", insertError);
          // Rollback transaction on error
          db.rollback(() => {
            res.status(500).json({ error: "Database insert error" });
          });
        });
    });
  });
});

// Get all movies along with their genres and actors
router.get("/", (req, res) => {
  // Query to fetch all movies
  const sqlMovies = `SELECT * FROM movies`;

  db.query(sqlMovies, (error, movieResults) => {
    if (error) {
      console.error("Error fetching movies:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // If no movies are found, return an empty array
    if (movieResults.length === 0) {
      return res.status(200).json([]);
    }

    // For each movie, we need to fetch the related genres and actors
    const moviePromises = movieResults.map((movie) => {
      const movieId = movie.movie_id;

      // Query to fetch genres for each movie
      const sqlGenres = `SELECT g.genre_id, g.genre_name 
                         FROM movie_genres mg 
                         JOIN genres g ON mg.genre_id = g.genre_id 
                         WHERE mg.movie_id = ?`;

      // Query to fetch actors for each movie
      const sqlActors = `SELECT a.actor_id, a.name 
                         FROM movie_cast ma 
                         JOIN actors a ON ma.actor_id = a.actor_id 
                         WHERE ma.movie_id = ?`;

      // Fetch genres and actors for this movie
      return Promise.all([
        new Promise((resolve, reject) => {
          db.query(sqlGenres, [movieId], (genreError, genreResults) => {
            if (genreError) {
              return reject(genreError);
            }
            resolve(genreResults);
          });
        }),
        new Promise((resolve, reject) => {
          db.query(sqlActors, [movieId], (actorError, actorResults) => {
            if (actorError) {
              return reject(actorError);
            }
            resolve(actorResults);
          });
        }),
      ])
        .then(([genres, actors]) => {
          // Return the movie object along with genres and actors
          return {
            ...movie,
            genres: genres,
            actors: actors,
          };
        })
        .catch((fetchError) => {
          console.error("Error fetching genres or actors:", fetchError);
          throw fetchError;
        });
    });

    // Wait for all promises (for each movie) to resolve
    Promise.all(moviePromises)
      .then((moviesWithDetails) => {
        res.status(200).json(moviesWithDetails);
      })
      .catch((error) => {
        console.error("Error resolving movie details:", error);
        res.status(500).json({ error: "Error fetching movie details" });
      });
  });
});

// Get a movie by ID, along with its genres and actors
router.get("/:id", (req, res) => {
  const movieId = req.params.id;

  // Query to fetch the movie details
  const sqlMovie = `SELECT * FROM movies WHERE movie_id = ?`;

  // Query to fetch genres and actors
  const sqlGenres = `SELECT g.genre_id, g.name FROM movie_genres mg JOIN genres g ON mg.genre_id = g.genre_id WHERE mg.movie_id = ?`;
  const sqlActors = `SELECT a.actor_id, a.name FROM movie_actors ma JOIN actors a ON ma.actor_id = a.actor_id WHERE ma.movie_id = ?`;

  db.query(sqlMovie, [movieId], (error, movieResults) => {
    if (error) {
      console.error("Error fetching movie:", error);
      return res.status(500).json({ error: "Database error" });
    }

    if (movieResults.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Fetch genres and actors
    db.query(sqlGenres, [movieId], (genreError, genreResults) => {
      if (genreError) {
        console.error("Error fetching genres:", genreError);
        return res.status(500).json({ error: "Database error" });
      }

      db.query(sqlActors, [movieId], (actorError, actorResults) => {
        if (actorError) {
          console.error("Error fetching actors:", actorError);
          return res.status(500).json({ error: "Database error" });
        }

        // Combine movie details with genres and actors
        const movieData = {
          ...movieResults[0],
          genres: genreResults,
          actors: actorResults,
        };

        res.status(200).json(movieData);
      });
    });
  });
});

// Export the router
module.exports = router;
