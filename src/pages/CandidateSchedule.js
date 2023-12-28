import React, { useState } from 'react';
import DragDropCalendar from '../components/DragDropCalendar';
import EventModal from '../components/EventModal';
import './CandidateSchedule.css';

function CandidateSchedule() {
  const [events, setEvents] = useState([]); // Replace with actual events data
  const [modalOpen, setModalOpen] = useState(false);

  // Function to handle adding/editing events
  const handleEventChange = (eventData) => {
    setEvents([...events, eventData]);
    // Add logic to update events
  };

  return (
    <div className="candidateSchedule">
      <h1>Candidate Schedules</h1>
      <DragDropCalendar events={events} onEventClick={() => setModalOpen(true)} />
      {modalOpen && <EventModal onEventChange={handleEventChange} onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default CandidateSchedule;
