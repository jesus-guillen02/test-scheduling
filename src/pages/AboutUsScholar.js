import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ScholarPage() {
  const { scholarId } = useParams();
  const [scholarData, setScholarData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint
    axios.get(`/api/scholars/${scholarId}`)
      .then(response => {
        setScholarData(response.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching scholar data', error));
  }, [scholarId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{scholarData.name}</h1>
      <p>{scholarData.bio}</p>
      {/* Display other scholar details */}
    </div>
  );
}

export default ScholarPage;
