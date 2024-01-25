import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AboutUsScholars() {
  const { slug } = useParams();
  const [scholarData, setScholarData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setScholarData(null);

    fetch(`http://localhost:3002/api/scholars/${slug}`) // Adjusted endpoint
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
  }, [slug]); // Dependency on slug

  if (error) return <div>Error: {error}</div>;
  if (!scholarData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{scholarData.name}</h1>
      <p>Hometown: {scholarData.hometown}</p>
      <p>Class Year: {scholarData.classYear}</p>
      <p>Biography: {scholarData.bio || scholarData.biography}</p>
      {/* Render additional scholar details here */}
    </div>
  );
}

export default AboutUsScholars;





