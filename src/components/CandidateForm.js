import React, { useState } from 'react';
import '../components/Form.css'; // Reusing the same styles as for ScholarForm

function CandidateForm() {
  const [candidateData, setCandidateData] = useState({
    name: '',
    hometown: '',
    biography: '',
    photo: '',
    intendedMajor: '',
    funFact: '',
    interests: '',
    college: '',
    day: ''
  });

  const handleChange = (e) => {
    setCandidateData({ ...candidateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint and adjust HTTP method as necessary
      const response = await fetch(`http://localhost:3002/api/candidates`, {
        method: 'POST', // or 'PUT' if updating an existing scholar
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidateData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log('Success:', responseData);
      // Additional logic on success (e.g., redirect or display a success message)
    } catch (error) {
      console.error('Error:', error);
      // Handle errors (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">

      <div className="field-container">
        <label>Name:</label>
        <input type="text" name="name" value={candidateData.name} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Hometown:</label>
        <input type="text" name="hometown" value={candidateData.hometown} onChange={handleChange} />
      </div>

      <div className="full-width">
        <label>Biography:</label>
        <textarea name="biography" value={candidateData.biography} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Photo (URL):</label>
        <input type="text" name="photo" value={candidateData.photo} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Intended Major:</label>
        <input type="text" name="intendedMajor" value={candidateData.intendedMajor} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Fun Fact:</label>
        <input type="text" name="funFact" value={candidateData.funFact} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Interests:</label>
        <input type="text" name="interests" value={candidateData.interests} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>College:</label>
        <input type="text" name="college" value={candidateData.college} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Day:</label>
        <input type="text" name="day" value={candidateData.day} onChange={handleChange} />
      </div>

      <div className="full-width">
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export default CandidateForm;
