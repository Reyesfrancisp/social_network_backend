const mongoose = require('mongoose');
const { Schema } = mongoose;

// Reaction Schema for nested documents
const reactionSchema = new Schema({
  // Define the fields for the reactions here
});

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
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { getters: true },
    // This option allows you to include virtual properties in the JSON output
    // This is necessary for the virtual `friendCount`.
  }
);

// Create a virtual `friendCount`
thoughtSchema.virtual('friendCount').get(function () {
  // `this` refers to the current Thought document.
  return this.friends.length;
});

// Create the Thought model using the schema
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
