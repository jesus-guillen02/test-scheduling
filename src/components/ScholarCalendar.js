import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction'; // Required for draggable events

const ScholarCalendar = () => {
  const [scholars, setScholars] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch scholars
        const scholarsResponse = await fetch('http://localhost:3002/api/scholars');
        if (!scholarsResponse.ok) throw new Error('Failed to fetch scholars.');
        const scholarsData = await scholarsResponse.json();
        
        // Transform scholars data for FullCalendar
        const resources = scholarsData.map(scholar => ({
          id: scholar.slug,
          title: `${scholar.name} (${scholar.classYear})`,
          extendedProps: {
            prefName: scholar.prefName,
            classYear: scholar.classYear,
            interests: scholar.interests.join(', '),
            imageURL: scholar.imageURL,
          }
        }));

        // Optionally, fetch events here as well and set them in the state
        const eventsResponse = await fetch('http://localhost:3002/api/events');
        const eventData = await eventsResponse.json();
        // transform eventData if necessary, then setEvents(eventData)

        setScholars(resources);
        // setEvents(transformedEventData); // Uncomment when event fetching is implemented
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEventDrop = async (info) => {
    const { event } = info;
    const eventId = event.id;
    const newStart = event.start.toISOString();
    const newEnd = event.end.toISOString();
    const newResourceId = event.resourceId; // If you're using resource timelines
  
    try {
      const response = await fetch(`http://localhost:3002/api/events`, {
        method: 'PUT', // Assuming your backend supports REST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: newStart,
          end: newEnd,
          resourceId: newResourceId, // Make sure your backend handles resourceId if necessary
        }),
      });
  
      if (!response.ok) throw new Error('Failed to update the event.');
  
      // Optionally, fetch updated events from the backend or update local state directly
    } catch (error) {
      console.error('Error updating event:', error);
      info.revert(); // Reverts the event's start/end date to its original values
    }
  };

  const handleEventResize = async (info) => {
    const { event } = info;
    const eventId = event.id;
    const newStart = event.start.toISOString();
    const newEnd = event.end.toISOString();
  
    try {
      const response = await fetch(`http://localhost:3002/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: newStart,
          end: newEnd,
          // resourceId is not changed on resize, so no need to send it
        }),
      });
  
      if (!response.ok) throw new Error('Failed to update the event.');
  
      // Similar to handleEventDrop, handle the response or update local state as necessary
    } catch (error) {
      console.error('Error resizing event:', error);
      info.revert(); // Reverts the event to its original duration
    }
  };
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <FullCalendar
      editable = {true}
      plugins={[resourceTimelinePlugin, interactionPlugin]}
      initialView="resourceTimelineDay"
      resources={scholars}
      events={events} // Ensure you've fetched and set events
      eventDrop={handleEventDrop}
      eventResize={handleEventResize}
      droppable={true} // Allows external events to be dropped onto the calendar
      // drop={handleDrop} // Implement if you want to handle dropping external items
    />
  );
};

export default ScholarCalendar;