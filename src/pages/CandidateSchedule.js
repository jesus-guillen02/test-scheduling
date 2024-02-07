import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import './CandidateSchedule.css';

const CandidateCalendar = () => {
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidatesResponse = await fetch('http://localhost:3002/api/candidates');
        const eventsResponse = await fetch('http://localhost:3002/api/events');
        if (!candidatesResponse.ok || !eventsResponse.ok) {
          throw new Error('Failed to fetch data.');
        }

        const candidatesData = await candidatesResponse.json();
        const eventData = await eventsResponse.json();

        // Prepare scholars as resources for the calendar
        const calendarResources = candidatesData.map(scholar => ({
          id: candidate.slug,
          title: `${candidate.name} (${candidate.classYear})`,
        }));

        // Prepare events, associating them with scholars by slugs
        const calendarEvents = eventData.map(event => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          resourceId: event.scholarSlugs[0], // Assuming one scholar per event for simplicity
        }));

        setResources(calendarResources);
        setEvents(calendarEvents);
      } catch (err) {
        setError(err.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateEventBackend = async (eventId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3002/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update the event on the server.');
      }

      // Optionally, refresh events from the backend here if needed
    } catch (error) {
      console.error('Error updating event:', error);
      throw error; // Rethrow to handle in the calling context
    }
  };

  const handleEventDropOrResize = async (info, action) => {
    const { event } = info;
    const updatedData = {
      start: event.startStr,
      end: event.endStr,
      // Include additional event fields as necessary for the update
    };

    try {
      await updateEventBackend(event.id, updatedData);
      // If additional UI update is needed, handle here
    } catch (error) {
      console.error(`Failed to ${action} event:`, error);
      info.revert();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <FullCalendar
      plugins={[resourceTimelinePlugin, interactionPlugin]}
      initialView="resourceTimelineDay"
      resources={resources}
      events={events}
      editable={true}
      eventDrop={(info) => handleEventDropOrResize(info, 'drop')}
      eventResize={(info) => handleEventDropOrResize(info, 'resize')}
      droppable={true}
    />
  );
};

export default CandidateCalendar;
