import React, { useState } from 'react';
import '../components/Form.css'; // Make sure this path matches your CSS file

function ScholarForm() {
  const [scholarData, setScholarData] = useState({
    name: '',
    hometown: '',
    classYear: '',
    biography: '',
    internshipsOrResearch: '',
    awards: '',
    photos: '',
    majors: '',
    minors: '',
    interests: '',
    funFacts: ''
  });

  const handleChange = (e) => {
    setScholarData({ ...scholarData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint and adjust HTTP method as necessary
      const response = await fetch('http://localhost:3001/api/scholars', {
        method: 'POST', // or 'PUT' if updating an existing scholar
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scholarData),
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
        <input type="text" name="name" value={scholarData.name} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Hometown:</label>
        <input type="text" name="hometown" value={scholarData.hometown} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Class Year:</label>
        <input type="text" name="classYear" value={scholarData.classYear} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Interests:</label>
        <input type="text" name="interests" value={scholarData.interests} onChange={handleChange} />
      </div>

      <div className="full-width">
        <label>Biography:</label>
        <textarea name="biography" value={scholarData.biography} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Internships or Research:</label>
        <input type="text" name="internshipsOrResearch" value={scholarData.internshipsOrResearch} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Awards:</label>
        <input type="text" name="awards" value={scholarData.awards} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Majors:</label>
        <input type="text" name="majors" value={scholarData.majors} onChange={handleChange} />
      </div>

      <div className="field-container">
        <label>Minors:</label>
        <input type="text" name="minors" value={scholarData.minors} onChange={handleChange} />
      </div>

      <div className="full-width">
        <label>Fun Facts:</label>
        <textarea name="funFacts" value={scholarData.funFacts} onChange={handleChange} />
      </div>

      <div className="full-width">
        <button type="submit" onClick={() => console.log('Button clicked')}>Save</button>
      </div>
    </form>
  );
}

export default ScholarForm;

