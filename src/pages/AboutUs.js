import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {

  const scholars = [
    { name: 'Scholar 1', path: '/scholar1' },
    { name: 'Scholar 2', path: '/scholar2' },
    // More scholars...
  ];

  return (
    <div className="aboutUs">
      <h1>About Us</h1>
      <p>Welcome to [Your App Name], a tool designed to...</p>
      <h1>Our Mission</h1>
      <p>Our mission is to...</p>
      {/* Additional sections like team information, history, etc. */}
      <h2>Class of XX</h2>
      <div className="scholar-links">
        {scholars.map(scholar => (
          <Link key={scholar.name} to={scholar.path}>{scholar.name}</Link>
        ))}
      </div>
      {/* Social media links or other contact information */}
    </div>
  );
}

export default AboutUs;
