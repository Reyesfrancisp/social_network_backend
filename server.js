// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const db = require('./db/connection');
// Import the user routes
const apiRoutes = require('./routes/api_routes');

// Use the user routes
app.use('/api', apiRoutes);

//middleware
userSchema.pre('remove', async function (next) {
  try {
    await Thought.deleteMany({ username: this.username });
    next();
  } catch (error) {
    next(error);
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

// Connect to MongoDB
db.once('open', () => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT));
});