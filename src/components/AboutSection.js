import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
    return (
        <aside className="about-section">
            <h3>About the Program</h3>
            <p>This section can contain information about the UTSA Top Scholar program, details about the application, etc.</p>
            <a href="/more-info">Learn More</a>
        </aside>
    );
}

export default AboutSection;
