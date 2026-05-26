import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p className="footer-text">
                Created with care by <span className="footer-name">Lady</span> ✨
            </p>
            <p className="footer-year">© {year}</p>
        </footer>
    );
};

export default Footer;
