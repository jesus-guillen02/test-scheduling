const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date, // Date of the event
  beginTime: String, // Format: 'HH:MM AM/PM'
  endTime: String, // Format: 'HH:MM AM/PM'
  location: String,
  professors: [String],
  description: String,
  // Additional fields...
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
