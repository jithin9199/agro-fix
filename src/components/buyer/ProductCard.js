import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faMinus, 
  faPlus, 
  faLeaf, 
  faAppleAlt, 
  faCarrot,
  faHeart,
  faEye,
  faCheck,
  faStar,
  faStarHalfAlt,
  faTag,
  faBoxOpen,
  faTruck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const ProductCard = ({ product, isFavorite, onToggleFavorite }) => {
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  const handleAddToCart = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart(product, quantity);
    setIsAddedToCart(true);
    
    // Reset the added notification after 2 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  // Toggle favorite status
  const toggleFavorite = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };

  // Select icon based on product category
  let categoryIcon;
  let badgeColor = '';
  
  switch(product.category) {
    case 'Fruits':
      categoryIcon = faAppleAlt;
      badgeColor = 'fruit-badge';
      break;
    case 'Vegetables':
      categoryIcon = faCarrot;
      badgeColor = 'vegetable-badge';
      break;
    case 'Organic':
      categoryIcon = faLeaf;
      badgeColor = 'organic-badge';
      break;
    default:
      categoryIcon = faBoxOpen;
      badgeColor = 'default-badge';
  }

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star-icon filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="star-icon half" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={farStar} className="star-icon" />);
      }
    }
    
    return (
      <div className="product-rating">
        {stars} 
        <span className="rating-count">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Calculate discount if any
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''} ${product.stockQuantity === 0 ? 'out-of-stock-card' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card-inner">
        <div className="product-card-front">
          <div className={`product-badge ${badgeColor}`}>
            <FontAwesomeIcon icon={categoryIcon} />
            <span>{product.category}</span>
          </div>
          
          {hasDiscount && (
            <div className="discount-badge">
              <FontAwesomeIcon icon={faTag} /> {discountPercentage}% OFF
            </div>
          )}
          
          {product.featured && (
            <div className="featured-badge">
              Featured
            </div>
          )}
          
          <button 
            className={`favorite-button ${isFavorite ? 'active' : ''}`} 
            onClick={toggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FontAwesomeIcon icon={isFavorite ? faHeart : farHeart} />
          </button>
          
          <Link to={`/product/${product.id}`} className="product-link">
            <div className="product-image-container">
              <div 
                className="product-image" 
                style={{ 
                  backgroundImage: `url(${product.imageUrl || product.image || 'https://via.placeholder.com/300x200?text=' + product.name})` 
                }}
              >
                {product.stockQuantity === 0 && (
                  <div className="out-of-stock-overlay">
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>
              
              <div className="product-quick-actions">
                <Link 
                  to={`/product/${product.id}`} 
                  className="quick-view-button"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon icon={faEye} /> 
                  <span>Quick View</span>
                </Link>
                
                <button 
                  className={`quick-add-button ${isAddedToCart ? 'added' : ''}`}
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity === 0}
                >
                  <FontAwesomeIcon icon={isAddedToCart ? faCheck : faShoppingCart} />
                  <span>{isAddedToCart ? 'Added' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>
          </Link>
          
          <div className="product-info">
            <div className="product-header">
              <Link to={`/product/${product.id}`} className="product-title-link">
                <h3 className="product-title">{product.name}</h3>
              </Link>
              
              <div className="price-container">
                {hasDiscount && (
                  <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                )}
                <p className="product-price">
                  ${product.price.toFixed(2)}
                  <span className="unit">/ {product.unit || 'unit'}</span>
                </p>
              </div>
            </div>
            
            {product.rating && renderStars(product.rating)}
            
            <div className="product-meta">
              <div className="stock-status">
                {product.stockQuantity > 10 ? (
                  <span className="in-stock">
                    <FontAwesomeIcon icon={faCheck} /> In Stock
                  </span>
                ) : product.stockQuantity > 0 ? (
                  <span className="low-stock">
                    <FontAwesomeIcon icon={faCheck} /> Only {product.stockQuantity} left
                  </span>
                ) : (
                  <span className="out-of-stock">
                    <FontAwesomeIcon icon={faTimes} /> Out of Stock
                  </span>
                )}
              </div>
              
              <div className="shipping-info">
                <FontAwesomeIcon icon={faTruck} /> Fast Delivery
              </div>
            </div>
            
            <div className="product-description">
              {product.description ? 
                (product.description.length > 65 ? 
                  `${product.description.substring(0, 65)}...` : 
                  product.description) : 
                `Premium quality ${product.name.toLowerCase()} available for bulk orders.`}
            </div>
            
            <div className="product-footer">
              <div className="quantity-control">
                <button 
                  className="quantity-btn decrease"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity(prev => Math.max(1, prev - 1));
                  }}
                  aria-label="Decrease quantity"
                  disabled={product.stockQuantity === 0}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input 
                  type="number" 
                  min="1" 
                  max={product.stockQuantity || 99}
                  value={quantity} 
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
                  }}
                  className="quantity-input"
                  disabled={product.stockQuantity === 0}
                />
                <button 
                  className="quantity-btn increase"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity(prev => Math.min(product.stockQuantity || 99, prev + 1));
                  }}
                  aria-label="Increase quantity"
                  disabled={product.stockQuantity === 0 || quantity >= product.stockQuantity}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              
              <button 
                className={`add-to-cart-button ${isAddedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
                aria-label="Add to cart"
                disabled={product.stockQuantity === 0}
              >
                <FontAwesomeIcon icon={isAddedToCart ? faCheck : faShoppingCart} />
                <span>{isAddedToCart ? 'Added' : 'Add'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;