import React from 'react';
import './EditInterface.css';

const EditInterface = ({ onSave, onCancel, defaultValue }) => {
    return (
        <div className="edit-interface">
            <label htmlFor="editField">Edit Info:</label>
            <input type="text" id="editField" defaultValue={defaultValue} />
            <div className="edit-actions">
                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default EditInterface;
