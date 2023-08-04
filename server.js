// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Import the user routes
const apiRoutes = require('./routes/api_routes');

// Use the user routes
app.use('/api/users', apiRoutes);

// Connect to MongoDB
mongoose.connect('mongodburl', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
