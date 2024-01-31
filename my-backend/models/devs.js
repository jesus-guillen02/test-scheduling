const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const developerSchema = new mongoose.Schema({
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
    lowercase: true
    // Email validation regex can be added if needed
  },
  password: {
    type: String,
    required: true,
    // Consider adding minlength or other validations
  },
  role: {
    type: String,
    required: true,
    enum: ['Scholar','Developer', 'SuperUser','Candidate'], // Example roles - adjust as needed
  },
});

// Hash password before saving
developerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for authentication
developerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;

