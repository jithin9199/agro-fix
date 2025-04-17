import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCartPlus, 
  faStar, 
  faStarHalfAlt, 
  faEye,
  faShoppingCart,
  faCheck,
  faTruck,
  faTimes,
  faLeaf,
  faCarrot,
  faAppleAlt,
  faTag
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product, isFavorite, onToggleFavorite }) => {
  const { addToCart } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  // Get category icon based on product category
  const getCategoryIcon = () => {
    switch (product.category?.toLowerCase()) {
      case 'fruits':
        return faAppleAlt;
      case 'vegetables':
        return faCarrot;
      case 'organic':
        return faLeaf;
      default:
        return faLeaf;
    }
  };

  // Get category badge color
  const getBadgeColor = () => {
    switch (product.category?.toLowerCase()) {
      case 'fruits':
        return 'badge-warning';
      case 'vegetables':
        return 'badge-success';
      case 'organic':
        return 'badge-primary';
      default:
        return 'badge-secondary';
    }
  };
  
  const categoryIcon = getCategoryIcon();
  const badgeColor = getBadgeColor();

  // Calculate discount percentage if applicable
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : (product.discountPercent || null);
  
  const handleAddToCart = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart(product, 1);
    setIsAddedToCart(true);
    
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };
  
  const toggleFavorite = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onToggleFavorite) onToggleFavorite(product.id);
  };
  
  const renderStars = (rating = 4.5) => {
    const starsToRender = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsToRender.push(
          <FontAwesomeIcon key={i} icon={faStar} className="star-filled" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        starsToRender.push(
          <FontAwesomeIcon key={i} icon={faStarHalfAlt} className="star-filled" />
        );
      } else {
        starsToRender.push(
          <FontAwesomeIcon key={i} icon={farStar} className="star-empty" />
        );
      }
    }
    
    return (
      <div className="product-rating">
        {starsToRender}
        <span className="rating-number">({rating?.toFixed(1) || "4.5"})</span>
      </div>
    );
  };
  
  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''} ${product.stockQuantity === 0 ? 'out-of-stock' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-badges">
        <div className={`category-badge ${badgeColor}`}>
          <FontAwesomeIcon icon={categoryIcon} />
          <span>{product.category}</span>
        </div>
        
        {discountPercentage && (
          <div className="discount-badge">
            <FontAwesomeIcon icon={faTag} /> {discountPercentage}% OFF
          </div>
        )}
        
        {product.featured && (
          <div className="featured-badge">
            Featured
          </div>
        )}
      </div>
      
      <button 
        className={`favorite-button ${isFavorite ? 'active' : ''}`} 
        onClick={toggleFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <FontAwesomeIcon icon={isFavorite ? faHeart : farHeart} />
      </button>
      
      <div className="product-image-container">
        <div 
          className="product-image" 
          style={{ 
            backgroundImage: `url(${product.imageUrl || product.image || `https://source.unsplash.com/500x400/?${product.name.replace(' ', ',')}`})` 
          }}
        >
          {product.stockQuantity === 0 && (
            <div className="out-of-stock-overlay">
              <span>Out of Stock</span>
            </div>
          )}
          
          <div className={`product-actions ${isHovered ? 'show' : ''}`}>
            <Link 
              to={`/product/${product.id}`} 
              className="action-button view-button"
            >
              <FontAwesomeIcon icon={faEye} />
              <span>Quick View</span>
            </Link>
            
            <button 
              className={`action-button cart-button ${isAddedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
            >
              <FontAwesomeIcon icon={isAddedToCart ? faCheck : faShoppingCart} />
              <span>{isAddedToCart ? 'Added' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="product-content">
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>
        
        {renderStars(product.rating)}
        
        <div className="product-price-container">
          {hasDiscount && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-unit">/ {product.unit || 'unit'}</span>
        </div>
        
        <div className="product-footer">
          <div className="stock-status">
            {product.stockQuantity > 10 ? (
              <span className="in-stock">
                <FontAwesomeIcon icon={faCheck} /> In Stock
              </span>
            ) : product.stockQuantity > 0 ? (
              <span className="low-stock">
                <FontAwesomeIcon icon={faCheck} /> Low Stock
              </span>
            ) : (
              <span className="out-of-stock-label">
                <FontAwesomeIcon icon={faTimes} /> Out of Stock
              </span>
            )}
          </div>
          
          <div className="delivery-info">
            <FontAwesomeIcon icon={faTruck} /> Fast Delivery
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 