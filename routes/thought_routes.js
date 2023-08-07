const express = require('express');
const router = express.Router();
const { User, Thought } = require('../models');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    return res.status(200).json(thoughts);
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET a single thought by its _id
router.get('/:thoughtId', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.status(200).json(thought);
  } catch (error) {
    console.error('Error fetching thought:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST to create a new thought
router.post('/', async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;

    // Check if the associated user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the thought
    const thought = await Thought.create({
      thoughtText,
      username,
    });

    // Push the created thought's _id to the associated user's thoughts array field
    user.thoughts.push(thought._id);
    await user.save();

    return res.status(201).json(thought);
  } catch (error) {
    console.error('Error creating thought:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT to update a thought by its _id
router.put('/:thoughtId', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const { thoughtText } = req.body;

    // Find the thought by its _id and update the thoughtText
    const thought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.status(200).json(thought);
  } catch (error) {
    console.error('Error updating thought:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE to remove a thought by its _id
router.delete('/:thoughtId', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;

    // Find the thought by its _id
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Remove the thought from the associated user's thoughts array field
    await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thoughtId } });

    // Delete the thought
    await thought.remove();

    return res.status(200).json({ message: 'Thought removed successfully' });
  } catch (error) {
    console.error('Error removing thought:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST endpoint to create a reaction for a specific thought
router.post('/', async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const { reactionBody, username } = req.body;
  
      // Find the thought by its _id
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      // Create the reaction and add it to the thought's reactions array
      const reaction = {
        reactionBody,
        username,
      };
  
      thought.reactions.push(reaction);
      await thought.save();
  
      return res.status(201).json(reaction);
    } catch (error) {
      console.error('Error creating reaction:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // DELETE endpoint to remove a reaction by its reactionId value
  router.delete('/:reactionId', async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;
  
      // Find the thought by its _id
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      // Find the index of the reaction to remove
      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction.reactionId.toString() === reactionId
      );
  
      if (reactionIndex === -1) {
        return res.status(404).json({ message: 'Reaction not found' });
      }
  
      // Remove the reaction from the thought's reactions array
      thought.reactions.splice(reactionIndex, 1);
      await thought.save();
  
      return res.status(200).json({ message: 'Reaction removed successfully' });
    } catch (error) {
      console.error('Error removing reaction:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
