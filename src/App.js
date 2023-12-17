import React from 'react';
import UserInfo from './components/UserInfo'
import NavigationBar from './components/NavigationBar'; // Assuming this is the correct path
import MainContent from './components/MainContent'; // Assuming this is the correct path
import AboutSection from './components/AboutSection'; // Assuming this is the correct path
import Footer from './components/Footer'; // Assuming this is the correct path
import './App.css';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <UserInfo />
      <MainContent>
        {/* Content based on routing or state */}
      </MainContent>
      <AboutSection />
      <Footer />
    </div>
  );
}

export default App;
