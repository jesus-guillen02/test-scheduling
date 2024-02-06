const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Scholar = require('../models/scholar');
const Candidate = require('../models/candidate'); // Adjust path to your Event model

// Helper function to populate event data
const populateEvent = 'candidates scholars';
const resolveSlugsToIds = async (candidateSlugs, scholarSlugs) => {
    const candidates = await Candidate.find({ slug: { $in: candidateSlugs } });
    const scholars = await Scholar.find({ slug: { $in: scholarSlugs } });
  
    return {
      candidateIds: candidates.map(candidate => candidate._id),
      scholarIds: scholars.map(scholar => scholar._id)
    };
  };
  

// POST - Create a new event
router.post('/', async (req, res) => {
    try {
        const { candidateSlugs, scholarSlugs } = req.body;

        // Debugging: Confirm input from request
        console.log('Received candidateSlugs:', candidateSlugs);
        console.log('Received scholarSlugs:', scholarSlugs);

        const { candidateIds, scholarIds } = await resolveSlugsToIds(candidateSlugs, scholarSlugs);

        // Debugging: Log the resolved IDs
        console.log('Resolved candidate IDs:', candidateIds);
        console.log('Resolved scholar IDs:', scholarIds);
        
        // PROCEED WITH CREATING THE EVENT
        const newEvent = new Event({
            // other fields from req.body
            name: req.body.name,
            date: req.body.date,
            beginTime: req.body.beginTime,
            endTime: req.body.endTime,
            location: req.body.location,
            professors: req.body.professors,
            description: req.body.description,
            candidateSlugs: candidateIds, // Resolved IDs
            scholarSlugs: scholarIds, // Resolved IDs
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
        const events = await Event.find().populate(populateEvent);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Retrieve a single event by ID, with candidates and scholars populated
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate(populateEvent);
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
        const { candidateSlugs, scholarSlugs } = req.body;
        const { candidateIds, scholarIds } = await resolveSlugsToIds(candidateSlugs, scholarSlugs);

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
            // other fields from req.body
            name: req.body.name,
            date: req.body.date,
            beginTime: req.body.beginTime,
            endTime: req.body.endTime,
            location: req.body.location,
            professors: req.body.professors,
            description: req.body.description,
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

// POST - Add a candidate to an event
router.post('/event/:eventId/candidates', async (req, res) => {
    const { candidateSlug } = req.body; // Now receiving a slug
    try {
        const candidate = await Candidate.findOne({ slug: candidateSlug });
        if (!candidate) return res.status(404).send('Candidate not found');
  
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).send('Event not found');
  
        if (event.candidates.includes(candidate._id)) {
            return res.status(400).send('Candidate already part of the event');
        }
  
        event.candidates.push(candidate._id);
        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

// DELETE - Remove a candidate from an event
router.delete('/event/:eventId/candidates/:candidateSlug', async (req, res) => {
    try {
        const candidate = await Candidate.findOne({ slug: req.params.candidateSlug });
        if (!candidate) return res.status(404).send('Candidate not found');
  
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).send('Event not found');
  
        const index = event.candidates.indexOf(candidate._id);
        if (index > -1) {
            event.candidates.splice(index, 1);
            await event.save();
            res.status(200).json(event);
        } else {
            res.status(400).send('Candidate not found in the event');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });
  

// POST - Add a scholar to an event
router.post('/event/:eventId/scholars', async (req, res) => {
    const { scholarSlug } = req.body; // Now receiving a slug
    try {
        const scholar = await Scholar.findOne({ slug: scholarSlug });
        if (!scholar) return res.status(404).send('Scholar not found');
  
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).send('Event not found');
  
        if (event.scholars.includes(scholar._id)) {
            return res.status(400).send('Scholar already part of the event');
        }
  
        event.scholars.push(scholar._id);
        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });
  

// DELETE - Remove a scholar from an event
router.delete('/event/:eventId/scholars/:scholarSlug', async (req, res) => {
    try {
        const scholar = await Scholar.findOne({ slug: req.params.scholarSlug });
        if (!scholar) return res.status(404).send('Scholar not found');
  
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).send('Event not found');
  
        const index = event.scholars.indexOf(scholar._id);
        if (index > -1) {
            event.scholars.splice(index, 1);
            await event.save();
            res.status(200).json(event);
        } else {
            res.status(400).send('Scholar not found in the event');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
