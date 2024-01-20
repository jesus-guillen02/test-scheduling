import React from 'react';
import './EditPage.css';
import ScholarForm from '../components/ScholarForm';
import CandidateForm from '../components/CandidateForm';

function EditPage() {
  return (
    <div className="editPageContainer">
      <div className="section">
        <h2>Scholar Section</h2>
        <ScholarForm />
      </div>
      <div className="section">
        <h2>Candidate Section</h2>
        <CandidateForm />
      </div>
    </div>
  );
}

export default EditPage;
