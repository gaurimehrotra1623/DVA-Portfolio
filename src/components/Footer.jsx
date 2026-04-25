import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-copyright">
        © {new Date().getFullYear()} Gauri Mehrotra 
      </div>
    </footer>
  );
};

export default Footer;
