const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  beginTime: String,
  endTime: String,
  location: String,
  professors: [String],
  description: String,
  // Use slugs for linking
  candidateSlugs: [{
    type: String,
    ref: 'Candidate' // Make sure this matches the name used in mongoose.model for Candidate
  }],
  scholarSlugs: [{
    type: String,
    ref: 'Scholar' // Make sure this matches the name used in mongoose.model for Scholar
  }],
  // Additional fields...
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

