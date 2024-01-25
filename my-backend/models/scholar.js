const mongoose = require('mongoose');
const slugify = require('slugify');

const scholarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensure that the name is always provided
  },
  prefName: String, // Preferred Name
  pronouns: String,
  hometown: String,
  classYear: Number,
  interests: [String], // Array of interests
  internshipsResearch: [String], // Array of internship or research experiences
  bio: String, // Biography
  awards: [String], // Array of awards
  majors: [String], // Array of majors
  minors: [String], // Array of minors
  funFacts: [String], // Array of fun facts
  facultyConnections: [String], // Array of faculty connections
  slug: {
    type: String,
    unique: true,
    required: true
  },
  imageURL: String, // Image URL
});

scholarSchema.pre('save', async function(next) {
  console.log('Pre-save hook triggered for scholar:', this);

  if (this.isNew || this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    console.log('Generated slug:', this.slug);

    // Handle duplicate slugs
    const slugRegex = new RegExp(`^${this.slug}(-\\d+)?$`, 'i');
    const scholarWithSlug = await mongoose.model('Scholar').find({ slug: slugRegex });

    if (scholarWithSlug.length) {
      this.slug = `${this.slug}-${scholarWithSlug.length + 1}`;
    }
  } else {
    console.log('Slug not modified.');
  }
  next();
});

const Scholar = mongoose.model('Scholar', scholarSchema);

module.exports = Scholar;