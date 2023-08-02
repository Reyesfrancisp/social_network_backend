const mongoose = require('mongoose');

// Create the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (value) {
        // Regular expression to check if the email is valid
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Please provide a valid email address',
    },
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought', // Referencing the Thought model
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Self-reference to the User model
    },
  ],
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;