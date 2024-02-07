const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  beginTime: String,
  endTime: String,
  location: String,
  professors: [String],
  description: String,
  // Change to use ObjectId for referencing
  candidates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate' // Assuming 'Candidate' is the correct model name
  }],
  scholars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholar' // Assuming 'Scholar' is the correct model name
  }],
  // Additional fields...
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

