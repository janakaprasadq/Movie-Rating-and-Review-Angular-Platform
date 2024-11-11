// server.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");
const movieRoutes = require("./routes/movieRoutes");
const actorRoutes = require("./routes/actorRoutes");
const genreRoutes = require("./routes/genreRoutes");
const cors = require("cors"); // Import cors

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true, // Enable credentials if needed (e.g., for cookies)
  })
);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/genres", genreRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
