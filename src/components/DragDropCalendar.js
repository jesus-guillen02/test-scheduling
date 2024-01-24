import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import axios from 'axios'; // Import axios only once here
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);

const DragDropCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/events');
                setEvents(response.data);
                setError('');
            } catch (err) {
                console.error("Error fetching events:", err.response || err); // Log detailed error
                setError('Failed to load events');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const onEventDrop = async ({ event, start, end }) => {
        const idx = events.findIndex(evt => evt.id === event.id);
        if (idx === -1) return; // Event not found in the current state

        const originalEvent = events[idx];
        const updatedEvent = { ...event, start, end };
        const updatedEvents = [...events];
        updatedEvents[idx] = updatedEvent;

        setEvents(updatedEvents);

        // Update backend
        try {
            const response = await axios.put(`/api/events/${event.id}`, updatedEvent);
            // Optionally, update the state based on the response
            console.log('Event updated successfully:', response.data);
        } catch (error) {
            console.error('Failed to update event:', error);
            // Revert the state change if the backend update fails
            setEvents(events.map(evt => (evt.id === event.id ? originalEvent : evt)));
        }
    };

    const onEventResize = async ({ event, start, end }) => {
        const idx = events.findIndex(evt => evt.id === event.id);
        if (idx === -1) return; // Event not found in the current state

        const originalEvent = events[idx];
        const updatedEvent = { ...event, start, end };
        const updatedEvents = [...events];
        updatedEvents[idx] = updatedEvent;

        setEvents(updatedEvents);

        // Update backend
        try {
            const response = await axios.put(`/api/events/${event.id}`, updatedEvent);
            console.log('Event resized successfully:', response.data);
        } catch (error) {
            console.error('Failed to resize event:', error);
            // Revert the state change if the backend update fails
            setEvents(events.map(evt => (evt.id === event.id ? originalEvent : evt)));
        }
    };


    const onSelectSlot = async ({ start, end }) => {
        // Custom logic for slot selection
        // Check for overlap with existing events
        const overlap = events.some(event =>
            moment(start).isBetween(event.start, event.end, undefined, '[)') ||
            moment(end).isBetween(event.start, event.end, undefined, '(]')
        );

        if (!overlap) {
            // Logic to add new event
            const newEvent = {
                // Don't set an id yet if the backend will generate it
                title: 'New Event',
                start,
                end
            };

            try {
                // Assuming the backend returns the new event with an id
                const response = await axios.post('/api/events', newEvent);
                setEvents([...events, response.data]); // Update state with the new event returned from the backend
                console.log('New event added successfully:', response.data);
            } catch (error) {
                console.error('Failed to add new event:', error);
                // Optionally, handle the UI feedback for failure
            }
        } else {
            alert('Time slot is already occupied.');
        }
    };

    const eventStyleGetter = (event) => {
        let backgroundColor = '#3174ad'; // Default color

        switch (event.type) {
            case 'class':
                backgroundColor = '#f28c8c';
                break;
            case 'personal':
                backgroundColor = '#8cf2a2';
                break;
            case 'preferred':
                backgroundColor = '#f2e58c';
                break;
            default:
                break;
        }

        const style = {
            backgroundColor,
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };

        return { style }; // Added return statement
    };

    const DnDCalendar = withDragAndDrop(Calendar);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <DnDCalendar
            localizer={localizer}
            events={events}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            onSelectSlot={onSelectSlot}
            eventPropGetter={eventStyleGetter}
            style={{ height: '500px' }}
        />
    );
};

export default DragDropCalendar;