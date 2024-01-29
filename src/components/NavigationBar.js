import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationBar.css';
import logo from '../photos/top-terry-scholars_680.png'; // Adjust the path to your logo image

const NavigationBar = ({ isLoggedIn, userName }) => {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <nav className="navigation-bar">
            <a href="/" className="home-button">
                <img src={logo} alt="Home" />
            </a>
            <ul className="nav-links">
                <li><a href="/candidates">Candidate Schedules</a></li>
                <li><a href="/scholars">Scholar Schedules</a></li>
                <li><a href="/markup-edit">Markup/Edit</a></li>
                <li><a href="/about">About Us</a></li>
            </ul>
            <div className="auth-area">
                {isLoggedIn ? (
                    <span className="user-greeting">Welcome, {userName}!</span>
                ) : (
                    <>
                        <button className="auth-button" onClick={handleSignInClick}>Sign In</button>
                        <button className="auth-button">Developers</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavigationBar;
