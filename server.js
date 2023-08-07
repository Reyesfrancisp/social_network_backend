// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const db = require('./db/connection');
// Import the user routes
const apiRoutes = require('./routes/api_routes');

// Use the user routes
app.use('/api', apiRoutes);

// Connect to MongoDB
db.once('open', () => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT));
});