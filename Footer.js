import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>Contact Us: info@example.com</p>
            <p>Office Location: 123 Street, City, Country</p>
            <p>&copy; {new Date().getFullYear()} UTSA Top Scholar Program</p>
        </footer>
    );
}

export default Footer;
