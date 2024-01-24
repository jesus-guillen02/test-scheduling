import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {
  const scholarsByYear = {
    '2024': [{ name: 'Jesus Guillen', id: '1' }, { name: ' Will Hughes', id: '2' }],
    '2025': [{ name: 'Samantha Lugo', id: '3' }],
    '2026': [{ name: 'Jose Morales', id: '4' }],
    '2027': [{ name: 'Jonah Espinoza', id: '3' }],
    // More scholars grouped by year...
  };

  const renderScholars = (year) => (
    <div>
      <h2>Class of '{year.substring(2)}</h2>
      <div>
        {scholarsByYear[year].map(scholar => (
          <Link key={scholar.id} to={`/scholar/${scholar.id}`}>
            {scholar.name} |
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="aboutUs">
      <h1>About Us</h1>
      <p>Welcome to [Your App Name], a tool designed to...</p>
      <h1>Our Mission</h1>
      <p>Our mission is to...</p>
      {/* Static content */}
      {Object.keys(scholarsByYear).map(year => renderScholars(year))}
      {/* Social media links or other contact information */}
    </div>
  );
}

export default AboutUs;
