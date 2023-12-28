const mongoose = require('mongoose');
const Schedule = require('../models/schedule')
const Scholar = require('../models/scholar');
const Candidate = require('../models/candidate');
const Event = require('../models/event');

console.log('Imported models:', {
  Schedule: Schedule,
  Scholar: Scholar,
  Candidate: Candidate,
  Event: Event
});

async function generateOptimalSchedule(scheduleId, eventsIds, scholarIds, candidateIds) {
  console.log('Received IDs for schedule generation:', { eventsIds, scholarIds, candidateIds });
  // Fetch the existing schedule by ID
  const existingSchedule = await Schedule.findById(scheduleId);

  if (!existingSchedule) {
    throw new Error('Schedule not found');
  }

// Create a new schedule using details from the existing one
  let schedule = new Schedule({
    title: existingSchedule.title,
    date: existingSchedule.date,
    startTime: existingSchedule.startTime,
    endTime: existingSchedule.endTime,
    linkedScholars: [], // Initialize as empty array
    linkedCandidates: [] // Initialize as empty array
  });

  try {
    console.log('New schedule instance created:', schedule);

    let events = await Event.find({ _id: { $in: eventsIds } });
    console.log('Found events:', events);

    let scholars = await Scholar.find({ _id: { $in: scholarIds } });
    console.log('Found scholars:', scholars);

    let candidates = await Candidate.find({ _id: { $in: candidateIds } });
    console.log('Found candidates:', candidates);

    for (let event of events) {
      let availableScholars = await getAvailableScholarsFor(event, scholars);
      console.log(`Available scholars for event ${event._id}:`, availableScholars);

      for (let candidate of candidates) {
        let bestMatchScholar = findBestMatchScholar(candidate, availableScholars);
        console.log(`Best match for candidate ${candidate._id}:`, bestMatchScholar);

        if (bestMatchScholar) {
          assignToSchedule(schedule, event, bestMatchScholar, candidate);
          await updateAvailability(bestMatchScholar, event);
        }
      }
    }

    await schedule.save();
    console.log('Schedule saved:', schedule);
    return schedule;
  } catch (error) {
    console.error('Error in generateOptimalSchedule:', error);
    throw error;  // Rethrow the error for handling it higher up the call stack
  }
}

async function getAvailableScholarsFor(event, scholars) {
  try {
    const busyScholarsIds = await Schedule.find({
      events: { $in: [event._id] }
    }).distinct('linkedScholars');

    return scholars.filter(scholar => !busyScholarsIds.includes(scholar._id.toString()));
  } catch (error) {
    console.error('Error in getAvailableScholarsFor:', error);
    throw error;
  }
}

function findBestMatchScholar(candidate, availableScholars) {
  let bestMatch = null;
  let highestScore = -Infinity;

  for (let scholar of availableScholars) {
    let score = 0;

    if (scholar.majors.includes(candidate.major)) {
      score += 3;
    }

    if (scholar.hometown === candidate.hometown) {
      score += 2;
    }

    if (Array.isArray(scholar.backgroundInterests) && Array.isArray(candidate.backgroundInterests)) {
      let sharedInterests = scholar.backgroundInterests.filter(interest =>
        candidate.backgroundInterests.includes(interest));
      score += sharedInterests.length;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = scholar;
    }
  }

  return bestMatch;
}

function assignToSchedule(schedule, event, scholar, candidate) {
  schedule.linkedScholars = schedule.linkedScholars || [];
  schedule.linkedCandidates = schedule.linkedCandidates || [];

  schedule.linkedScholars.push(scholar._id);
  schedule.linkedCandidates.push(candidate._id);
}

async function updateAvailability(scholar, event) {
  try {
    let existingSchedules = await Schedule.find({
      linkedScholars: { $in: [scholar._id] },
      events: { $in: [event._id] }
    });

    if (existingSchedules.length === 0) {
      await Schedule.updateOne(
        { linkedScholars: scholar._id },
        { $push: { events: event._id } },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error('Error in updateAvailability:', error);
    throw error;
  }
}


module.exports = {
  generateOptimalSchedule
};
