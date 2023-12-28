import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import axios from 'axios';
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
                setError('Failed to load events');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const onEventDrop = ({ event, start, end }) => {
        // Custom logic for event drop
        const idx = events.findIndex(evt => evt.id === event.id);
        const updatedEvent = { ...event, start, end };
        const updatedEvents = [...events];
        updatedEvents[idx] = updatedEvent;
        setEvents(updatedEvents);
        // Update backend here if necessary
    };

    const onEventResize = ({ event, start, end }) => {
        // Custom logic for event resize
        const idx = events.findIndex(evt => evt.id === event.id);
        const updatedEvent = { ...event, start, end };
        const updatedEvents = [...events];
        updatedEvents[idx] = updatedEvent;
        setEvents(updatedEvents);
        // Update backend here if necessary
    };

    const onSelectSlot = ({ start, end }) => {
        // Custom logic for slot selection
        // Check for overlap with existing events
        const overlap = events.some(event => 
            moment(start).isBetween(event.start, event.end) ||
            moment(end).isBetween(event.start, event.end)
        );
        if (!overlap) {
            // Logic to add new event
            const newEvent = {
                id: Math.max(...events.map(evt => evt.id)) + 1, // Generate new ID
                title: 'New Event',
                start,
                end
            };
            setEvents([...events, newEvent]);
            // Update backend here if necessary
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
            style={{ height: "500px" }}
        />
    );
};
};
export default DragDropCalendar;