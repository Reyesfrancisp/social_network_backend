const mongoose = require('mongoose');
const { Schema } = mongoose;

// Reaction Schema (Subdocument)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: mongoose.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toISOString(),
    },
  },
  {
    // This is necessary for the virtual `reactionCount`.
    toJSON: { getters: true },
  }
);

// Main Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toISOString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Nested reactions subdocument array
  },
  {
    // This is necessary for the virtual `reactionCount`.
    toJSON: { getters: true },
  }
);

// Create a virtual `reactionCount`
thoughtSchema.virtual('reactionCount').get(function () {
  // `this` refers to the current Thought document.
  // Here, you can return the length of the reactions array for the current thought.
  return this.reactions.length;
});

// Create the Thought model using the schema
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
