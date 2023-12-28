import React, { useState } from 'react';
import Modal from 'react-modal';

if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#root');
}

const EventModal = ({ isOpen, onClose, onSave, eventDetails }) => {
    const [eventData, setEventData] = useState({
        title: eventDetails.title || '',
        type: eventDetails.type || '',
        description: eventDetails.description || '',
        essential: eventDetails.essential || false,
        // Initialize start and end time if editing
    });

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = () => {
        setEventData({ ...eventData, essential: !eventData.essential });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(eventData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleChange}
                />

                <label>Type:</label>
                <select name="type" value={eventData.type} onChange={handleChange}>
                    <option value="class">Class</option>
                    <option value="personal">Personal</option>
                    <option value="preferred">Preferred</option>
                </select>

                <label>Description:</label>
                <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                />

                <label>
                    <input
                        type="checkbox"
                        name="essential"
                        checked={eventData.essential}
                        onChange={handleCheckboxChange}
                    />
                    Essential
                </label>

                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default EventModal;
