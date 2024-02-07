const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Scholar = require('../models/scholar');
const Candidate = require('../models/candidate');

// Helper function to resolve slugs to IDs
const resolveSlugsToIds = async (candidateSlugs, scholarSlugs) => {
  const candidates = await Candidate.find({ slug: { $in: candidateSlugs } });
  const scholars = await Scholar.find({ slug: { $in: scholarSlugs } });

  return {
    candidateIds: candidates.map(candidate => candidate._id),
    scholarIds: scholars.map(scholar => scholar._id),
  };
};

// POST - Create a new event
router.post('/', async (req, res) => {
  try {
    const { candidateSlugs, scholarSlugs, name, date, beginTime, endTime, location, professors, description } = req.body;
    const { candidateIds, scholarIds } = await resolveSlugsToIds(candidateSlugs, scholarSlugs);

    const newEvent = new Event({
      name,
      date,
      beginTime,
      endTime,
      location,
      professors,
      description,
      candidates: candidateIds,
      scholars: scholarIds,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error in creating event:', error);
    res.status(400).json({ message: error.message });
  }
});

// GET - Retrieve all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('candidates scholars');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Retrieve a single event by ID, with candidates and scholars populated
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('candidates scholars');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update an event by ID
router.put('/:id', async (req, res) => {
  try {
    const { candidateSlugs, scholarSlugs, name, date, beginTime, endTime, location, professors, description } = req.body;
    const { candidateIds, scholarIds } = await resolveSlugsToIds(candidateSlugs, scholarSlugs);

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
      name,
      date,
      beginTime,
      endTime,
      location,
      professors,
      description,
      candidates: candidateIds,
      scholars: scholarIds,
    }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete an event by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


