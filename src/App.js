import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ScholarSchedule from './pages/ScholarSchedule';
import CandidateSchedule from './pages/CandidateSchedule';
import EditPage from './pages/EditPage';
import AboutUs from './pages/AboutUs';
import ScholarProfile from './pages/ScholarProfile';
import Login from './pages/Login'; // Import the Login component
import DevLogin from './pages/devlogin'; // Import the Developers Login component
import './App.css';
import '../src/pages/HomePage.css';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <UserInfo />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/developers/login" element={<DevLogin />} /> {/* Developers Login route */}
          <Route path="/scholars" element={<ScholarSchedule />} />
          <Route path="/candidates" element={<CandidateSchedule />} />
          <Route path="/markup-edit" element={<EditPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about/scholars/:slug" element={<ScholarProfile />} />
          {/* Add other routes as needed */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;



