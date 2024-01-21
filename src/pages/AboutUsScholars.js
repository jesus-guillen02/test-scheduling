import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AboutScholar() {
  const { scholarId } = useParams();
  const [scholarData, setScholarData] = useState(null);

  useEffect(() => {
    // Fetch the data for the scholar using the scholarId
    // This is a placeholder for your fetch call
    fetch(`https://localhost:3000/scholars/${scholarId}`)
      .then(response => response.json())
      .then(data => setScholarData(data))
      .catch(error => console.error('Error fetching scholar data:', error));
  }, [scholarId]);

  if (!scholarData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{scholarData.name}</h1>
      {/* Render other scholar details */}
      <p>Hometown: {scholarData.hometown}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default AboutScholar;
