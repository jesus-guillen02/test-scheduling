import React, { useState } from 'react';
import '../components/Form.css'; // Assuming this path is correct and CSS is appropriate for the form

function CandidateForm() {
  const [candidateData, setCandidateData] = useState({
    name: '',
    bio: '',
    photo: '',
    college: '',
    intendedMajor: '',
    funFact: '',
    interests: '',
    highschool: '',
    hometown: '',
    day: ''
  });

  const handleChange = (e) => {
    setCandidateData({ ...candidateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure this endpoint matches your server's API endpoint for creating or updating a candidate
      const response = await fetch(`http://localhost:3002/api/candidates`, {
        method: 'POST',
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
      // Implement success logic, e.g., displaying a success message or redirecting
    } catch (error) {
      console.error('Error:', error);
      // Implement error handling logic, e.g., displaying an error message
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

      <div className="field-container">
        <label>Biography:</label>
        <textarea name="bio" value={candidateData.bio} onChange={handleChange} />
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
        <label>High School:</label>
        <input type="text" name="highschool" value={candidateData.highschool} onChange={handleChange} />
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

