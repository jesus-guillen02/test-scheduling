const express = require('express');
const router = express.Router();
const Event = require('../models/event'); // Adjust path to your Event model

// POST - Create a new event
router.post('/', async (req, res) => {
    try {
      const newEvent = new Event({
        name: req.body.name,
        date: req.body.date,
        beginTime: req.body.beginTime,
        endTime: req.body.endTime,
        location: req.body.location,
        professors: req.body.professors,
        description: req.body.description
        // Include other fields as necessary
      });
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// GET - Retrieve all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Retrieve a single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
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
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        date: req.body.date,
        beginTime: req.body.beginTime,
        endTime: req.body.endTime,
        location: req.body.location,
        professors: req.body.professors,
        description: req.body.description
        // Include other fields as necessary
      }, { new: true });
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
