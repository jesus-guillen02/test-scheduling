import React from 'react';
import './NavigationBar.css';

const NavigationBar = () => {
    return (
        <nav className="navigation-bar">
            <ul className="nav-links">
                <li><a href="/candidates">Candidate Schedules</a></li>
                <li><a href="/scholars">Scholar Schedules</a></li>
                <li><a href="/markup-edit">Markup/Edit</a></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
