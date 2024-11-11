// db.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost", // Your MySQL server address
  user: "root", // Your MySQL username
  password: "1234", // Your MySQL password
  database: "gmdb", // Your database name
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
