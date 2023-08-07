// app.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const db = require("./db/connection");
// Import the user routes
const userRoutes = require("./routes/user_routes");
const thoughtRoutes = require("./routes/thought_routes");
// Use the user routes
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

// Connect to MongoDB
db.once("open", () => {
  app.listen(PORT, () => console.log("Server started on port %s", PORT));
});