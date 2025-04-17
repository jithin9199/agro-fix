import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes, faLeaf, faSearch, faTruck, faCog } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { 
    page, 
    setPage, 
    cartItems,
    filters,
    setFilters
  } = useAppContext();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (showSearch) setShowSearch(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters({...filters, searchQuery: searchValue});
    if (page !== 'products') setPage('products');
    setShowSearch(false);
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => setPage('products')}>
            <FontAwesomeIcon icon={faLeaf} className="logo-icon" />
            <div className="logo-text">
              <h1>Agro-Fixx</h1>
              <p>Fresh Produce in Bulk</p>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="search-toggle" onClick={toggleSearch} aria-label="Toggle search">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            
            <button className="cart-button" onClick={() => setPage('order')} aria-label="View cart">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </button>
            
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
            </button>
          </div>
          
          <form className={`search-bar ${showSearch ? 'active' : ''}`} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          
          <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <ul>
              <li className={page === 'products' ? 'active' : ''}>
                <button onClick={() => {
                  setPage('products');
                  setMobileMenuOpen(false);
                }}>
                  <FontAwesomeIcon icon={faLeaf} />
                  Products
                </button>
              </li>
              <li className={page === 'order' ? 'active' : ''}>
                <button onClick={() => {
                  setPage('order');
                  setMobileMenuOpen(false);
                }}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Place Order
                  {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                </button>
              </li>
              <li className={page === 'tracking' ? 'active' : ''}>
                <button onClick={() => {
                  setPage('tracking');
                  setMobileMenuOpen(false);
                }}>
                  <FontAwesomeIcon icon={faTruck} />
                  Track Order
                </button>
              </li>
              <li className={page === 'admin' ? 'active' : ''}>
                <button onClick={() => {
                  setPage('admin');
                  setMobileMenuOpen(false);
                }}>
                  <FontAwesomeIcon icon={faCog} />
                  Admin
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 