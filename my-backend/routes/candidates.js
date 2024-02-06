const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Candidate = require('../models/candidate'); // Adjust path to your Candidate model

// POST - Add a new candidate
router.post('/', async (req, res) => {
  try {
    // Generate a slug based on the candidate's name
    const slug = slugify(req.body.name, { lower: true, strict: true });

    // Create a new Candidate instance, including the generated slug
    const newCandidate = new Candidate({
      ...req.body,
      slug, // Set the slug explicitly
    });

    // Save the new Candidate to the database
    const savedCandidate = await newCandidate.save();
    
    // Respond with the saved Candidate
    res.status(201).json(savedCandidate);
  } catch (error) {
    console.error('Error saving candidate:', error);
    res.status(400).json({ message: error.message });
  }
});

// GET - Retrieve all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Retrieve a single candidate by ID
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Retrieve a single candidate by slug
router.get('/:slug', async (req, res) => {
  try {
      const scholarSlug = req.params.slug;
      const scholar = await Scholar.findOne({ slug: scholarSlug });
      if (!scholar) {
          return res.status(404).json({ message: 'Scholar not found' });
      }
      res.json(scholar);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
// PUT - Update a candidate by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCandidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete a candidate by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!deletedCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
