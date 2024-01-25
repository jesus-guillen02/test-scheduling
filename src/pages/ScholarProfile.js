import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ScholarProfile.css';

function AboutUsScholars() {
  const { slug } = useParams();
  const [scholarData, setScholarData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setScholarData(null);

    fetch(`http://localhost:3002/api/scholars/${slug}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setScholarData(data))
      .catch(error => {
        console.error('Error fetching scholar data:', error);
        setError('Failed to load scholar data. Please try again later.');
      });
  }, [slug]);

  if (error) return <div>Error: {error}</div>;
  if (!scholarData) return <div>Loading...</div>;

  const photoUrl = `https://scheduling-offline.s3.amazonaws.com/headshots/${slug}.jpg`;

  // Helper function to render arrays as non-bulleted lists
  const renderList = (items) => {
    if (!items || items.length === 0) return null;
    return <ul className="about-us-scholars-list">{items.map((item, index) => <li key={index}>{item}</li>)}</ul>;
  };

  return (
    <div className="about-us-scholars-container">
      <div className="about-us-scholars-text">
        <h1 className="about-us-scholars-heading">{scholarData.name}</h1>
        {scholarData.prefname && <p><span className="about-us-scholars-bold">Preferred Name:</span> {scholarData.prefname}</p>}
        {scholarData.pronouns && <p><span className="about-us-scholars-bold">Pronouns:</span> {scholarData.pronouns}</p>}
        {scholarData.hometown && <p><span className="about-us-scholars-bold">Hometown:</span> {scholarData.hometown}</p>}
        {scholarData.classYear && <p><span className="about-us-scholars-bold">Class Year:</span> {scholarData.classYear}</p>}
        {scholarData.interests && <p><span className="about-us-scholars-bold">Interests:</span> {scholarData.interests}</p>}
        {scholarData.bio && <p><span className="about-us-scholars-bold">Biography:</span> {scholarData.bio}</p>}
        {scholarData.internshipsResearch && <div><span className="about-us-scholars-bold">Internships/Research:</span>{renderList(scholarData.internshipsResearch)}</div>}
        {scholarData.awards && <div><span className="about-us-scholars-bold">Awards:</span>{renderList(scholarData.awards)}</div>}
        {scholarData.majors && <div><span className="about-us-scholars-bold">Majors:</span>{renderList(scholarData.majors)}</div>}
        {scholarData.minors && <div><span className="about-us-scholars-bold">Minors:</span>{renderList(scholarData.minors)}</div>}
        {scholarData.funfacts && <div><span className="about-us-scholars-bold">Fun Facts:</span>{renderList(scholarData.funfacts)}</div>}
      </div>
      <img 
        src={photoUrl} 
        alt={`${scholarData.name}`} 
        className="about-us-scholars-image" 
      />
    </div>
  );
}

export default AboutUsScholars;
