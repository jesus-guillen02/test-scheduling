import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import NavigationBar from './components/NavigationBar';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'; // Import your page components
import ScholarSchedule from './pages/ScholarSchedule';
import CandidateSchedule from './pages/CandidateSchedule';
import EditPage from './pages/EditPage';
import AboutUs from './pages/AboutUs';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <UserInfo />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scholar-schedule" element={<ScholarSchedule />} />
          <Route path="/candidate-schedule" element={<CandidateSchedule />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/about" element={<AboutUs />} />
          {/* Add other routes as needed */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;