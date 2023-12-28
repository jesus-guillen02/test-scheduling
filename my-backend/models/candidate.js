const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  bio: String, // Biography included in the model
  photo: String, // URL to the photo
  major: String,
  // Additional fields as required (Hometown)
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;
