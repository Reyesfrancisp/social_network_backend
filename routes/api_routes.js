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

// Route to add a new user
router.post('/user', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

// Route to delete a user by ID
router.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the user and remove the user's associated thoughts
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Thought.deleteMany({ username: user.username });

    await user.remove();

    return res.status(200).json({ message: 'User and associated thoughts removed successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to edit a user by ID
router.put('/user/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated user
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

router.post('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    // Check if both the user and the friend exist in the database
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    // Check if the friend is already in the user's friend list
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend already in the friend list' });
    }

    // Add the friend to the user's friend list
    user.friends.push(friendId);
    await user.save();

    return res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Error adding friend:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    // Check if both the user and the friend exist in the database
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    // Check if the friend is in the user's friend list
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend is not in the friend list' });
    }

    // Remove the friend from the user's friend list
    user.friends.pull(friendId);
    await user.save();

    return res.status(200).json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error('Error removing friend:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
