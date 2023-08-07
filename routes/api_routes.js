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

// Route to get a single user by ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});


module.exports = router;
