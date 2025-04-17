import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-wave"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AgroFixx</h3>
            <p>Your trusted partner for bulk vegetable and fruit orders.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#products">Products</a></li>
              <li><a href="#order">Place Order</a></li>
              <li><a href="#tracking">Track Order</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@agrofixx.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Harvest Lane, Farmville, CA 94107</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AgroFixx. All rights reserved.</p>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#twitter" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#instagram" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 