import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faPaperPlane,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram,
  faPinterest
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const { setPage } = useAppContext();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle the newsletter subscription here
    console.log('Subscribing email:', email);
    setSubscribed(true);
    setEmail('');
    
    // Reset subscription state after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <FontAwesomeIcon icon={faLeaf} className="logo-icon" />
              <h2>AgroFiX</h2>
            </div>
            <p>Providing fresh, high-quality fruits and vegetables directly from farms to your doorstep. We specialize in bulk orders for homes, restaurants, and businesses.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h3>Quick Links</h3>
              <ul>
                <li><button onClick={() => setPage('home')}>Home</button></li>
                <li><button onClick={() => setPage('products')}>Shop</button></li>
                <li><button onClick={() => setPage('about')}>About Us</button></li>
                <li><button onClick={() => setPage('contact')}>Contact</button></li>
                <li><button onClick={() => setPage('tracking')}>Order Tracking</button></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3>Categories</h3>
              <ul>
                <li><button onClick={() => setPage('category-fruits')}>Fruits</button></li>
                <li><button onClick={() => setPage('category-vegetables')}>Vegetables</button></li>
                <li><button onClick={() => setPage('category-organic')}>Organic</button></li>
                <li><button onClick={() => setPage('category-seasonal')}>Seasonal</button></li>
                <li><button onClick={() => setPage('category-bundles')}>Value Bundles</button></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3>Customer Service</h3>
              <ul>
                <li><button onClick={() => setPage('faq')}>FAQ</button></li>
                <li><button onClick={() => setPage('shipping')}>Shipping Policy</button></li>
                <li><button onClick={() => setPage('returns')}>Returns & Refunds</button></li>
                <li><button onClick={() => setPage('privacy')}>Privacy Policy</button></li>
                <li><button onClick={() => setPage('terms')}>Terms & Conditions</button></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for seasonal updates, special offers, and healthy recipes.</p>
            
            {subscribed ? (
              <div className="subscription-success">
                <FontAwesomeIcon icon={faCheck} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </form>
            )}
            
            <div className="contact-info">
              <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>contact@agrofix.com</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>123 Fresh Produce Lane, Farmville, CA 98765</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {currentYear} AgroFiX. All rights reserved.</p>
          </div>
          <div className="payment-methods">
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-visa-3-226460.png" alt="Visa" />
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-mastercard-3-226462.png" alt="Mastercard" />
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-paypal-3-226463.png" alt="PayPal" />
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-american-express-3-226461.png" alt="American Express" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: var(--gray-800);
          color: var(--gray-300);
          padding-top: 60px;
        }
        
        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        
        .footer-top {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-brand {
          display: flex;
          flex-direction: column;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .footer-logo .logo-icon {
          font-size: 2rem;
          color: var(--primary-color);
          margin-right: 10px;
        }
        
        .footer-logo h2 {
          margin: 0;
          color: var(--white);
          font-weight: 700;
        }
        
        .footer-brand p {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .social-links {
          display: flex;
          gap: 15px;
        }
        
        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: var(--white);
          transition: var(--transition);
        }
        
        .social-links a:hover {
          background: var(--primary-color);
          transform: translateY(-3px);
        }
        
        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        
        .footer-links-column h3 {
          color: var(--white);
          font-size: 1.2rem;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }
        
        .footer-links-column h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: var(--primary-color);
        }
        
        .footer-links-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links-column li {
          margin-bottom: 8px;
        }
        
        .footer-links-column button {
          background: transparent;
          border: none;
          color: var(--gray-400);
          font-size: 0.95rem;
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
          padding: 0;
        }
        
        .footer-links-column button:hover {
          color: var(--primary-color);
          padding-left: 5px;
        }
        
        .footer-newsletter h3 {
          color: var(--white);
          font-size: 1.2rem;
          margin-bottom: 15px;
          position: relative;
          padding-bottom: 10px;
        }
        
        .footer-newsletter h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: var(--primary-color);
        }
        
        .footer-newsletter p {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .newsletter-form {
          margin-bottom: 20px;
        }
        
        .input-group {
          display: flex;
          position: relative;
        }
        
        .input-group input {
          flex: 1;
          padding: 12px 15px;
          border: none;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.1);
          color: var(--white);
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition);
        }
        
        .input-group input::placeholder {
          color: var(--gray-400);
        }
        
        .input-group input:focus {
          background: rgba(255, 255, 255, 0.15);
        }
        
        .input-group button {
          position: absolute;
          right: 5px;
          top: 5px;
          bottom: 5px;
          width: 40px;
          border: none;
          border-radius: 50%;
          background: var(--primary-color);
          color: var(--white);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        
        .input-group button:hover {
          background: var(--primary-dark);
        }
        
        .subscription-success {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 15px;
          background: rgba(40, 167, 69, 0.2);
          color: #4caf50;
          border-radius: 30px;
          margin-bottom: 20px;
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
        }
        
        .contact-item svg {
          color: var(--primary-color);
          width: 18px;
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
        }
        
        .copyright {
          font-size: 0.9rem;
        }
        
        .payment-methods {
          display: flex;
          gap: 10px;
        }
        
        .payment-methods img {
          height: 24px;
          width: auto;
          filter: grayscale(100%) brightness(1.8);
          transition: var(--transition);
        }
        
        .payment-methods img:hover {
          filter: grayscale(0) brightness(1);
        }
        
        @media (max-width: 992px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
          }
          
          .footer-brand {
            grid-column: 1 / -1;
          }
        }
        
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .footer-links {
            grid-template-columns: 1fr 1fr;
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }
        
        @media (max-width: 576px) {
          .footer-links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer; 