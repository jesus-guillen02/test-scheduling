const express = require('express');
const router = express.Router();
const Scholar = require('../models/scholar'); // Adjust path to your Scholar model
const slugify = require('slugify'); // Require slugify if you are using it

// POST - Add a new scholar
router.post('/', async (req, res) => {
  try {
    const slug = slugify(req.body.name, { lower: true, strict: true });
    const newScholar = new Scholar({
      ...req.body,
      slug, // Set the slug explicitly
    });
    const savedScholar = await newScholar.save();
    res.status(201).json(savedScholar);
  } catch (error) {
    console.error('Error saving scholar:', error);
    res.status(400).json({ message: error.message });
  }
});

// GET - Retrieve all scholars
router.get('/', async (req, res) => {
  try {
    const scholars = await Scholar.find();
    res.json(scholars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Retrieve a single scholar by Slug
router.get('/:slug', async (req, res) => {
  try {
    const scholar = await Scholar.findOne({ slug: req.params.slug });
    if (!scholar) {
      return res.status(404).json({ message: 'Scholar not found' });
    }
    res.json(scholar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Retrieve a single scholar by ID (only matches valid MongoDB ObjectIds)
router.get('/:id([0-9a-fA-F]{24})', async (req, res) => {
  try {
    const scholar = await Scholar.findById(req.params.id);
    if (!scholar) {
      return res.status(404).json({ message: 'Scholar not found' });
    }
    res.json(scholar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update a scholar by ID
router.put('/:id', async (req, res) => {
  try {
    const scholar = await Scholar.findById(req.params.id);
    if (!scholar) {
      return res.status(404).json({ message: 'Scholar not found' });
    }

    // Update fields
    scholar.set(req.body);
    const updatedScholar = await scholar.save();

    res.json(updatedScholar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete a scholar by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedScholar = await Scholar.findByIdAndDelete(req.params.id);
    if (!deletedScholar) {
      return res.status(404).json({ message: 'Scholar not found' });
    }
    res.json({ message: 'Scholar deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

