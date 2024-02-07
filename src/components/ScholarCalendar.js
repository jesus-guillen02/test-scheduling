import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import './ScholarCalendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScholarCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const calendarRef = useRef(null);
  const calendarInstance = useRef(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3002/api/events');
        if (!res.ok) throw new Error('Failed to fetch events.');
  
        const eventsData = await res.json();
        const formattedEvents = eventsData.map(event => ({
          id: String(event._id),
          calendarId: '1', // Assuming all events belong to a single calendar
          title: `${event.name} - ${event.scholars.map(scholar => scholar.name).join(', ')}`, // Including scholar names in the title
          category: 'time',
          start: event.start,
          end: event.end,
          body: `Scholars: ${event.scholars.map(scholar => scholar.name).join(', ')}`, // Optional: Use for a custom detail popup
        }));
  
        setEvents(formattedEvents);
      } catch (err) {
        console.error("Fetching events error:", err);
        toast.error(`Error fetching events: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    if (calendarRef.current && !calendarInstance.current && !isLoading) {
      const calendar = new Calendar(calendarRef.current, {
        defaultView: 'day',
        taskView: false,
        scheduleView: true,
        useCreationPopup: false,
        useDetailPopup: false,
        timezones: [{
          timezoneOffset: -360,
          displayLabel: 'Central Time',
          tooltip: 'Central Time',
        }],
      });

      calendar.createSchedules(events);
      calendarInstance.current = calendar;
    }
  }, [events, isLoading]);

  return (
    <div>
      <ToastContainer />
      <div ref={calendarRef} style={{ height: '800px' }}></div>
    </div>
  );
};

export default ScholarCalendar;
