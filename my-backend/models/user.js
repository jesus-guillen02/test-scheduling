const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // Add email validation regex here if needed
  },
  password: {
    type: String,
    required: true
    // You might also want to add minlength or other validations
  }
  // Add other fields like password, createdAt, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
