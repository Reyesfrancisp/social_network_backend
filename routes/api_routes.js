// Import necessary modules
const express = require("express");
const router = express.Router();
const {User, Thought, reactionSchema } = require("../models"); 

// Route to get all users
router.get('/user', async (req, res) => {
  try {
    const users = await User.find({}); // Empty object to find all users

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
