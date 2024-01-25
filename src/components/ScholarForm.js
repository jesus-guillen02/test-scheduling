import React, { useState } from 'react';
import '../components/Form.css';

function ScholarForm() {
  const [scholarData, setScholarData] = useState({
    name: '',
    prefName: '',
    pronouns: '',
    hometown: '',
    classYear: '',
    bio: '',
    interests: '',
    internshipsResearch: '',
    awards: '',
    majors: '',
    minors: '',
    funFacts: '',
    facultyConnections: '',
    imageURL: ''
  });

  const handleChange = (e) => {
    setScholarData({ ...scholarData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated fields to arrays
    const payload = {
      ...scholarData,
      interests: scholarData.interests.split(',').map(item => item.trim()),
      internshipsResearch: scholarData.internshipsResearch.split(',').map(item => item.trim()),
      awards: scholarData.awards.split(',').map(item => item.trim()),
      majors: scholarData.majors.split(',').map(item => item.trim()),
      minors: scholarData.minors.split(',').map(item => item.trim()),
      funFacts: scholarData.funFacts.split(',').map(item => item.trim()),
      facultyConnections: scholarData.facultyConnections.split(',').map(item => item.trim()),
    };

    try {
      const response = await fetch('http://localhost:3002/api/scholars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
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
      {/* Text fields for single-value properties */}
      <div className="field-container">
        <label>Name:</label>
        <input type="text" name="name" value={scholarData.name} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Preferred Name:</label>
        <input type="text" name="prefName" value={scholarData.prefName} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Pronouns:</label>
        <input type="text" name="pronouns" value={scholarData.pronouns} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Hometown:</label>
        <input type="text" name="hometown" value={scholarData.hometown} onChange={handleChange} />
      </div>

      {/* Textarea for multi-line text */}
      <div className="full-width">
        <label>Biography:</label>
        <textarea name="bio" value={scholarData.bio} onChange={handleChange} />
      </div>

      {/* Text inputs for array fields */}
      <div className="field-container">
        <label>Interests (comma-separated):</label>
        <input type="text" name="interests" value={scholarData.interests} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Internships/Research (comma-separated):</label>
        <input type="text" name="internshipsResearch" value={scholarData.internshipsResearch} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Awards (comma-separated):</label>
        <input type="text" name="awards" value={scholarData.awards} onChange={handleChange} />
      </div>
      
      <div className="field-container">
        <label>Image URL:</label>
        <input type="text" name="imageURL" value={scholarData.imageURL} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Majors (comma-separated):</label>
        <input type="text" name="majors" value={scholarData.majors} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Minors (comma-separated):</label>
        <input type="text" name="minors" value={scholarData.minors} onChange={handleChange} />
      </div>

      <div className="full-width">
        <label>Fun Facts (comma-separated):</label>
        <textarea name="funFacts" value={scholarData.funFacts} onChange={handleChange} />
      </div>

      <div className="full-width">
        <label>Faculty Connections (comma-separated):</label>
        <textarea name="facultyConnections" value={scholarData.facultyConnections} onChange={handleChange} />
      </div>

      <div className="full-width class-year-container">
        <label>Class Year:</label>
        <input type="number" name="classYear" value={scholarData.classYear} onChange={handleChange} />
      </div>

      <div className="full-width">
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export default ScholarForm;

