import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Assuming you have a CSS file for global styles
import App from './App'; // Import the main App component

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
