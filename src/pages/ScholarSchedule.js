import React from 'react';
import DragDropCalendar from '../components/DragDropCalendar'; // Ensure this path is correct
import './ScholarSchedule.css'; 

function ScholarSchedule() {
  console.log('Rendering ScholarSchedule with DragDropCalendar'); // For debugging

  return (
    <div className="scholarSchedule">
      <h1>Scholar Schedule</h1>
      <p>Displaying schedules and relevant information for scholars.</p>

      <div className="calendar-container"> {/* Wrapper for the calendar */}
        <DragDropCalendar />
      </div>
    </div>
  );
}

export default ScholarSchedule;

