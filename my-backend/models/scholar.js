const mongoose = require('mongoose');

const scholarSchema = new mongoose.Schema({
  name: String,
  hometown: String,
  classYear: Number, // or String if you prefer (e.g., "2023")
  bio: String, // Biography
  internshipsResearch: [String], // Array of Internships or Research descriptions
  awards: [String], // Array of Awards
  photo: String, // URL to the photo
  majors: [String], // Array of Majors
  minors: [String] // Array of Minors
});

const Scholar = mongoose.model('Scholar', scholarSchema);
module.exports = Scholar;
