import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">🍲</span>
            <span className="brand-name">Ayini Foods</span>
          </div>
          <p className="footer-description">
            Bringing authentic South Indian flavors to your doorstep.
            Fresh, traditional, and homemade quality products.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">📘</a>
            <a href="#" className="social-link" aria-label="Instagram">📷</a>
            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
            <a href="#" className="social-link" aria-label="WhatsApp">💬</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products?category=ready-mix">Ready Mix</Link></li>
            <li><Link to="/products?category=snacks">Snacks</Link></li>
            <li><Link to="/products?category=pickles">Pickles</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h4 className="footer-heading">Customer Service</h4>
          <ul className="footer-links">
            <li><Link to="/my-account">My Account</Link></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <div className="contact-info">
            <p>📞 +91 98765 43210</p>
            <p>✉️ info@ayinifoods.com</p>
            <p>📍 Chennai, Tamil Nadu, India</p>
          </div>
          <div className="business-hours">
            <p><strong>Business Hours:</strong></p>
            <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Ayini Foods. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
