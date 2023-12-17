import React from 'react';
import './FilterComponent.css';

const FilterComponent = ({ onFilterChange }) => {
    return (
        <div className="filter-component">
            <label htmlFor="filter">Filter:</label>
            <select id="filter" onChange={onFilterChange}>
                <option value="all">All</option>
                <option value="candidates">Candidates</option>
                <option value="scholars">Scholars</option>
                <option value="events">Events</option>
            </select>
        </div>
    );
}

export default FilterComponent;
