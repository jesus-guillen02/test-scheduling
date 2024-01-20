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
    interests: ''
  });

  const handleChange = (e) => {
    setCandidateData({ ...candidateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle Submit Logic (e.g., sending data to a server)
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

      <div className="full-width">
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export default CandidateForm;
