const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const Schedule = require('../models/schedule'); // Adjust the path as needed
const { generateOptimalSchedule } = require('../logic/schedulingAlgorithm'); // Import the scheduling function

// POST - Create a new schedule
router.post('/', async (req, res) => {
  try {
    const newSchedule = new Schedule(req.body);
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Retrieve all schedules with populated references
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('linkedScholars', 'name') // Adjust second argument to select specific fields
      .populate('linkedCandidates', 'name'); // Adjust as needed
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Retrieve a specific schedule by its ID with populated references
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('linkedScholars', 'name')
      .populate('linkedCandidates', 'name');
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update a schedule by its ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST endpoint to generate a new optimal schedule
router.post('/generate', async (req, res) => {
  console.log(req.body);
  try {
    // Extract the actual arrays of IDs and scheduleId from the request body
    const { scheduleId, eventsIds, scholarIds, candidateIds } = req.body;

    // Ensure the body contains the necessary data
    if (!scheduleId || !eventsIds || !scholarIds || !candidateIds) {
      return res.status(400).json({ message: "Missing scheduleId, eventsIds, scholarIds, or candidateIds in request body" });
    }

    // Call the generateOptimalSchedule function with the extracted data
    const optimalSchedule = await generateOptimalSchedule(scheduleId, eventsIds, scholarIds, candidateIds);

    // Send the response
    res.status(201).json(optimalSchedule);
  } catch (error) {
    // Error handling
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Delete a schedule by its ID
router.delete('/:id', async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
=======

// Add your GET, POST, PUT, DELETE route handlers here
>>>>>>> 3b1e05039716ee7060a35d49178e7587a01766ba

module.exports = router;
