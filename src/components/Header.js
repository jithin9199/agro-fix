import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, 
  faSearch, 
  faShoppingCart, 
  faUser, 
  faBars, 
  faTimes,
  faCarrot,
  faAppleAlt,
  faChevronDown,
  faHistory,
  faShieldAlt,
  faSignOutAlt,
  faUserCog,
  faMapMarkerAlt,
  faHeart,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { cartItems, setFilters } = useAppContext();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({...prev, searchQuery: searchTerm}));
    navigate('/products');
    setSearchActive(false);
    setSearchTerm('');
    closeMobileMenu();
  };

  const navigateToCategory = (category) => {
    setFilters(prev => ({...prev, category}));
    navigate('/products');
    closeMobileMenu();
  };

  const toggleCategories = () => {
    setCategoriesDropdown(!categoriesDropdown);
    if(userDropdown) setUserDropdown(false);
  };
  
  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
    if(categoriesDropdown) setCategoriesDropdown(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setCategoriesDropdown(false);
    setUserDropdown(false);
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <div className="logo-icon">
            <FontAwesomeIcon icon={faLeaf} size="2x" />
          </div>
          <div className="logo-text">
            <h1>AgroFiX</h1>
            <p>Bulk Produce Delivered</p>
          </div>
        </Link>

        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
        </button>

        <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={closeMobileMenu} end>
                Shop
              </NavLink>
            </li>
            <li className={categoriesDropdown ? 'dropdown-open' : ''}>
              <button 
                onClick={toggleCategories}
                className="categories-button"
              >
                Categories <FontAwesomeIcon icon={faChevronDown} size="xs" />
              </button>
              {categoriesDropdown && (
                <div className="dropdown-menu categories-dropdown">
                  <div className="dropdown-item" onClick={() => navigateToCategory('Fruits')}>
                    <FontAwesomeIcon icon={faAppleAlt} /> Fruits
                  </div>
                  <div className="dropdown-item" onClick={() => navigateToCategory('Vegetables')}>
                    <FontAwesomeIcon icon={faCarrot} /> Vegetables
                  </div>
                  <div className="dropdown-item" onClick={() => navigateToCategory('Organic')}>
                    <FontAwesomeIcon icon={faLeaf} /> Organic
                  </div>
                  <div className="dropdown-item" onClick={() => {
                    setFilters(prev => ({...prev, category: ''}));
                    navigate('/products');
                    closeMobileMenu();
                  }}>
                    <FontAwesomeIcon icon={faShieldAlt} /> All Categories
                  </div>
                </div>
              )}
            </li>
            <li>
              <NavLink to="/about" onClick={closeMobileMenu}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMobileMenu}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" onClick={closeMobileMenu}>
                Admin
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button 
            className={`search-toggle ${searchActive ? 'active' : ''}`}
            onClick={() => setSearchActive(!searchActive)}
            aria-label="Toggle search"
          >
            <FontAwesomeIcon icon={searchActive ? faTimes : faSearch} />
          </button>

          <Link 
            to="/order" 
            className="cart-button"
            onClick={closeMobileMenu}
            aria-label="Shopping cart"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItems.length > 0 && (
              <div className="cart-count">{cartItems.length}</div>
            )}
          </Link>

          <Link 
            to="/tracking" 
            onClick={closeMobileMenu}
            aria-label="Order tracking"
            title="Order Tracking"
          >
            <FontAwesomeIcon icon={faHistory} />
          </Link>

          <button 
            onClick={toggleUserDropdown}
            aria-label="User account"
            className={userDropdown ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faUser} />
            {userDropdown && (
              <div className="dropdown-menu user-dropdown">
                <div className="dropdown-header">
                  <h4>My Account</h4>
                </div>
                <Link to="/profile" className="dropdown-item" onClick={closeMobileMenu}>
                  <FontAwesomeIcon icon={faUser} /> My Profile
                </Link>
                <Link to="/orders" className="dropdown-item" onClick={closeMobileMenu}>
                  <FontAwesomeIcon icon={faClipboardList} /> My Orders
                </Link>
                <Link to="/wishlist" className="dropdown-item" onClick={closeMobileMenu}>
                  <FontAwesomeIcon icon={faHeart} /> Wishlist
                </Link>
                <Link to="/addresses" className="dropdown-item" onClick={closeMobileMenu}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> My Addresses
                </Link>
                <div className="dropdown-divider"></div>
                <Link to="/admin" className="dropdown-item" onClick={closeMobileMenu}>
                  <FontAwesomeIcon icon={faUserCog} /> Admin Panel
                </Link>
                <div className="dropdown-item" onClick={() => { console.log('Logout'); closeMobileMenu(); }}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
      
      <div className={`search-bar ${searchActive ? 'active' : ''}`}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for fruits, vegetables, and more..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus={searchActive}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>

      <style jsx>{`
        /* Dropdown Menu Styles */
        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          min-width: 200px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
          padding: 10px 0;
          z-index: 100;
          animation: fadeInDown 0.3s ease;
          transform-origin: top right;
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .categories-dropdown {
          left: 0;
          right: auto;
          transform-origin: top left;
        }
        
        .dropdown-header {
          padding: 10px 15px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 5px;
        }
        
        .dropdown-header h4 {
          margin: 0;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        
        .dropdown-item {
          padding: 10px 15px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-color);
        }
        
        .dropdown-item:hover {
          background: rgba(26, 137, 23, 0.08);
          color: var(--primary-color);
        }
        
        .dropdown-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 5px 0;
        }
        
        .header-actions button.active {
          color: var(--primary-color);
          background-color: rgba(26, 137, 23, 0.1);
        }
        
        .dropdown-open button {
          color: var(--primary-color);
        }
        
        @media (max-width: 768px) {
          .dropdown-menu {
            position: static;
            width: 100%;
            box-shadow: none;
            border-radius: 0;
            background-color: rgba(0, 0, 0, 0.03);
            margin-top: 5px;
            animation: none;
          }
          
          .dropdown-item {
            padding-left: 20px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header; 