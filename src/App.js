import React from 'react';
<<<<<<< HEAD
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
=======
import UserInfo from './components/UserInfo'
import NavigationBar from './components/NavigationBar'; // Assuming this is the correct path
import MainContent from './components/MainContent'; // Assuming this is the correct path
import AboutSection from './components/AboutSection'; // Assuming this is the correct path
import Footer from './components/Footer'; // Assuming this is the correct path
>>>>>>> 3b1e05039716ee7060a35d49178e7587a01766ba
import './App.css';

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
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
=======
      <NavigationBar />
      <UserInfo />
      <MainContent>
        {/* Content based on routing or state */}
      </MainContent>
      <AboutSection />
      <Footer />
>>>>>>> 3b1e05039716ee7060a35d49178e7587a01766ba
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 3b1e05039716ee7060a35d49178e7587a01766ba
