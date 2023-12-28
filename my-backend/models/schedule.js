const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  linkedScholars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scholar' }],
  linkedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

console.log('Schedule model:', Schedule);  // This should log out the model function

module.exports = Schedule;

