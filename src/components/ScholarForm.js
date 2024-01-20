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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle Submit Logic (e.g., sending data to a server)
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
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export default ScholarForm;

