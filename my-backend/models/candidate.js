import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScholarCalendar = () => {
    const [isLoading, setIsLoading] = useState(true);
    const calendarRef = useRef(null);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Simulate fetching events and scholars
                const eventsRes = await fetch('http://localhost:3002/api/events');
                const scholarsRes = await fetch('http://localhost:3002/api/scholars');
                if (!eventsRes.ok || !scholarsRes.ok) throw new Error('Failed to fetch data.');
                
                const eventsData = await eventsRes.json();
                const scholarsData = await scholarsRes.json();
                
                const resources = scholarsData.map(scholar => ({
                    id: String(scholar._id),
                    title: scholar.name,
                }));
                
                const formattedEvents = eventsData.map(event => ({
                    id: String(event._id),
                    calendarId: '1', // Assuming all events belong to a single calendar
                    title: event.name,
                    category: 'time',
                    start: event.date,
                    end: event.endTime,
                    resourceId: event.scholars[0], // Assuming each event is associated with a single scholar for simplicity
                }));
                
                if (calendarRef.current) {
                    const calendar = new Calendar(calendarRef.current, {
                        defaultView: 'day',
                        taskView: false,
                        scheduleView: ['time'],
                        useCreationPopup: false,
                        useDetailPopup: false,
                        timezones: [{
                            timezoneOffset: -360,
                            displayLabel: 'CT',
                            tooltip: 'Central Time',
                        }],
                        resources: resources,
                        resourceView: true,
                    });
                    
                    calendar.createSchedules(formattedEvents);
                }
            } catch (err) {
                console.error("Fetching data error:", err);
                toast.error(`Error fetching data: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ToastContainer />
            <div ref={calendarRef} style={{ height: '800px', width: '100%' }}></div>
        </div>
    );
};

export default ScholarCalendar;
