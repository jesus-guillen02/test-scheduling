import React from 'react';
import './Footer.css';
import logo from '../photos/images.png'; // Update the path to your logo image

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-logo-container">
                <img src={logo} alt="Logo" className="footer-logo" />
            </div>
            <div className="footer-info">
                <p>Contact Us: top.scholar@gmail.com</p>
                <p>Office Location: 1 UTSA Circle, San Antonio, TX 78249</p>
                <p>&copy; {new Date().getFullYear()} UTSA Top Scholar Program</p>
            </div>
        </footer>
    );
}

export default Footer;
