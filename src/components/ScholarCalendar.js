import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';

const TuiScholarCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await fetch('http://localhost:3002/api/events');
        if (!eventsRes.ok) throw new Error('Failed to fetch events.');

        const eventsData = await eventsRes.json();
        const formattedEvents = eventsData.map(event => ({
          id: event._id,
          title: `${event.name} - ${event.location}`,
          category: 'time',
          start: event.date,
          end: event.endTime, // Adjust if endTime format needs conversion
          body: `Professors: ${event.professors.join(', ')}`,
        }));

        setEvents(formattedEvents);
      } catch (err) {
        setError(err.message);
        console.error("Fetching events error:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!calendarRef.current && !isLoading) {
      calendarRef.current = new Calendar(calendarRef.current, {
        defaultView: 'day',
        useCreationPopup: true,
        useDetailPopup: true,
        taskView: false,
        scheduleView: true,
        template: {
          time(schedule) {
            return `${schedule.title} <br> ${schedule.start} - ${schedule.end}`;
          }
        },
        timezones: [{
          timezoneOffset: -360,
          displayLabel: 'CT',
          tooltip: 'Central Time'
        }],
      });

      calendarRef.current.createSchedules(events);

      calendarRef.current.on('clickSchedule', function(event) {
        const { schedule } = event;
        onEventClick(schedule);
      });
    }
  }, [events, isLoading]);

  const handleEventUpdate = async (event) => {
    // Ensure you construct the update payload according to your backend API's requirements
    const updatedEvent = {
      name: event.title.split(' - ')[0],
      location: event.title.split(' - ')[1],
      date: event.start,
      endTime: event.end,
    };

    try {
      const response = await fetch(`http://localhost:3002/api/events/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to update event.');
      }
      // Optionally, refresh events from the backend here
    } catch (err) {
      console.error('Error updating event:', err);
      // Handle error (e.g., show an alert or notification)
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentEvent(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleEventUpdate(currentEvent);
    setIsModalOpen(false);
  };

  const onEventClick = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {isModalOpen && (
        <div style={{ position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
          <h2>Edit Event</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Name:</label>
              <input type="text" value={currentEvent?.title.split(' - ')[0]} onChange={(e) => handleInputChange('name', e.target.value)} />
            </div>
            <div>
              <label>Location:</label>
              <input type="text" value={currentEvent?.title.split(' - ')[1]} onChange={(e) => handleInputChange('location', e.target.value)} />
            </div>
            <div>
              <label>Date:</label>
              <input type="datetime-local" value={currentEvent?.start} onChange={(e) => handleInputChange('date', e.target.value)} />
            </div>
            <div>
              <label>End Time:</label>
              <input type="datetime-local" value={currentEvent?.end} onChange={(e) => handleInputChange('endTime', e.target.value)} />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
          </form>
        </div>
      )}
      <div id="calendar" ref={calendarRef}></div>
    </div>
  );
};

export default TuiScholarCalendar;


