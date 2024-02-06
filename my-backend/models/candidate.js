const mongoose = require('mongoose');
const slugify = require('slugify');

const candidateSchema = new mongoose.Schema({
  name: String,
  bio: String, // Biography included in the model
  photo: String, // URL to the photo
  college: String,
  intendedMajor: String,
  funfact: String,
  interests: String,
  highschool: String,
  hometown: String,
  day: String,
  // Additional fields as required
  slug: {
    type: String,
    unique: true,
    required: true
  }
});

candidateSchema.pre('save', async function(next) {
  console.log('Pre-save hook triggered for candidate:', this.name);

  if (this.isNew || this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    console.log('Generated slug for candidate:', this.slug);

    // Handle duplicate slugs by appending a number if necessary
    const slugRegex = new RegExp(`^${this.slug}(-\\d+)?$`, 'i');
    const candidatesWithSlug = await mongoose.model('Candidate').find({ slug: slugRegex });

    if (candidatesWithSlug.length) {
      this.slug = `${this.slug}-${candidatesWithSlug.length + 1}`;
      console.log('Adjusted slug for candidate due to duplicates:', this.slug);
    }
  } else {
    console.log('Slug not modified for candidate:', this.slug);
  }
  next();
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;

