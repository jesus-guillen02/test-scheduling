const mongoose = require('mongoose');
const slugify = require('slugify');
const bodyParser = require ('body-parser');

const scholarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensure that the name is always provided
  },
  hometown: String,
  classYear: Number,
  bio: String,
  internshipsResearch: [String],
  awards: [String],
  majors: [String],
  minors: [String],
  slug: {
    type: String,
    unique: true,
    required: true
  },
});

// Pre-save hook to generate and update the slug
scholarSchema.pre('save', async function(next) {
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
