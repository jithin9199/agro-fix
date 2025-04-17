import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faArrowLeft, 
  faLeaf, 
  faTruck, 
  faCheckCircle, 
  faShieldAlt,
  faStar,
  faStarHalfAlt,
  faCarrot,
  faAppleAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useAppContext();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (products && products.length > 0) {
      // Find the product matching the id
      const foundProduct = products.find(p => p.id.toString() === id);
      setProduct(foundProduct);
      
      if (foundProduct) {
        // Find related products from the same category
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 3);
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    }
  }, [products, id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      
      // Reset the added notification after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Generate star rating
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`star-${i}`} icon={faStar} className="star-icon filled" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half-star" icon={faStarHalfAlt} className="star-icon filled" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-star-${i}`} icon={faStar} className="star-icon empty" />);
    }
    
    return stars;
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Fruits':
        return faAppleAlt;
      case 'Vegetables':
        return faCarrot;
      case 'Organic':
        return faLeaf;
      default:
        return faLeaf;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Product Not Found</h2>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> {' > '}
        <Link to="/products">Products</Link> {' > '}
        <Link to={`/products?category=${product.category}`}>{product.category}</Link> {' > '}
        <span>{product.name}</span>
      </div>
      
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
      </div>
      
      <div className="product-details-content">
        <div className="product-images">
          <div 
            className="main-image" 
            style={{ 
              backgroundImage: `url(${product.imageUrl || product.image || `https://via.placeholder.com/600x400?text=${product.name}`})` 
            }}
          ></div>
          <div className="product-badge">
            <FontAwesomeIcon icon={getCategoryIcon(product.category)} /> {product.category}
          </div>
        </div>
        
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-meta">
            <div className="rating">
              {renderStarRating(product.rating || 4.5)}
              <span className="rating-text">({product.rating || 4.5})</span>
            </div>
            <div className="category">
              <span>Category: </span>
              <Link to={`/products?category=${product.category}`} className="category-link">
                {product.category}
              </Link>
            </div>
          </div>
          
          <div className="product-price">
            ${product.price.toFixed(2)} <span className="unit">/ {product.unit || 'unit'}</span>
          </div>
          
          <div className="product-stock">
            <span className={`stock-badge ${product.stockQuantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
              <FontAwesomeIcon icon={product.stockQuantity > 0 ? faCheckCircle : faTimes} />
              {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.stockQuantity > 0 && <span className="stock-quantity">({product.stockQuantity} available)</span>}
          </div>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <button className="qty-btn" onClick={decrementQuantity}>-</button>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange} 
                className="qty-input"
              />
              <button className="qty-btn" onClick={incrementQuantity}>+</button>
            </div>
            
            <button 
              className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`} 
              onClick={handleAddToCart}
              disabled={product.stockQuantity <= 0}
            >
              {addedToCart ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} /> Added to Cart
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </>
              )}
            </button>
          </div>
          
          <div className="product-features">
            <div className="feature">
              <FontAwesomeIcon icon={faLeaf} />
              <span>Premium Quality</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faTruck} />
              <span>Fast Delivery</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faShieldAlt} />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="product-tabs">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping & Returns
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description">
              <p>{product.description}</p>
              <p>Perfect for bulk orders, our {product.name.toLowerCase()} are sourced directly from trusted farms to ensure freshness and quality for your business needs.</p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="specifications">
              <div className="spec-item">
                <span className="spec-label">Product Name:</span>
                <span className="spec-value">{product.name}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Category:</span>
                <span className="spec-value">{product.category}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Package Size:</span>
                <span className="spec-value">{product.unit}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Stock Quantity:</span>
                <span className="spec-value">{product.stockQuantity} packages</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Product Code:</span>
                <span className="spec-value">PRD-{product.id}</span>
              </div>
            </div>
          )}
          
          {activeTab === 'shipping' && (
            <div className="shipping">
              <h3>Shipping Information</h3>
              <p>We deliver to businesses across the country with our reliable logistics network.</p>
              <ul>
                <li>Standard Delivery: 1-3 business days</li>
                <li>Express Delivery: Next business day (order before 12pm)</li>
                <li>Free shipping on orders over $500</li>
              </ul>
              
              <h3>Return Policy</h3>
              <p>We stand behind the quality of our products:</p>
              <ul>
                <li>Inspect all deliveries upon arrival</li>
                <li>Report any quality issues within 24 hours</li>
                <li>Damaged or unsatisfactory products will be replaced or refunded</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>Related Products</h2>
          <div className="related-products-grid">
            {relatedProducts.map(relProduct => (
              <div key={relProduct.id} className="related-product-card">
                <Link to={`/product/${relProduct.id}`} className="related-product-link">
                  <div 
                    className="related-product-image" 
                    style={{ 
                      backgroundImage: `url(${relProduct.imageUrl || relProduct.image || `https://via.placeholder.com/300x200?text=${relProduct.name}`})` 
                    }}
                  ></div>
                  <div className="related-product-info">
                    <h3>{relProduct.name}</h3>
                    <p className="related-product-price">${relProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .product-details-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }
        
        .breadcrumb {
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: var(--gray-600);
        }
        
        .breadcrumb a {
          color: var(--primary-color);
          text-decoration: none;
        }
        
        .breadcrumb a:hover {
          text-decoration: underline;
        }
        
        .back-button-container {
          margin-bottom: 2rem;
        }
        
        .back-button {
          background: transparent;
          border: none;
          color: var(--primary-color);
          font-size: 1rem;
          padding: 0.5rem 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .product-details-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        
        .product-images {
          position: relative;
        }
        
        .main-image {
          width: 100%;
          height: 450px;
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        
        .product-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: var(--primary-color);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }
        
        .product-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .product-name {
          font-size: 2.5rem;
          margin: 0;
          color: var(--gray-900);
          font-weight: 700;
        }
        
        .product-meta {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .star-icon {
          font-size: 1.1rem;
        }
        
        .star-icon.filled {
          color: #FFB800;
        }
        
        .star-icon.empty {
          color: var(--gray-300);
        }
        
        .rating-text {
          margin-left: 0.5rem;
          color: var(--gray-600);
        }
        
        .category {
          color: var(--gray-600);
        }
        
        .category-link {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 600;
        }
        
        .product-price {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-color);
        }
        
        .unit {
          font-size: 1rem;
          color: var(--gray-600);
          font-weight: 400;
        }
        
        .product-stock {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .stock-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .stock-badge.in-stock {
          background: rgba(76, 175, 80, 0.1);
          color: var(--primary-color);
        }
        
        .stock-badge.out-of-stock {
          background: rgba(244, 67, 54, 0.1);
          color: #f44336;
        }
        
        .stock-quantity {
          color: var(--gray-600);
        }
        
        .product-actions {
          display: flex;
          gap: 1.5rem;
          margin-top: 1rem;
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--gray-300);
          border-radius: 50px;
          overflow: hidden;
        }
        
        .qty-btn {
          width: 40px;
          height: 45px;
          border: none;
          background: white;
          color: var(--primary-color);
          font-size: 1.2rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .qty-btn:hover {
          background: rgba(76, 175, 80, 0.1);
        }
        
        .qty-input {
          width: 50px;
          height: 45px;
          border: none;
          border-left: 1px solid var(--gray-300);
          border-right: 1px solid var(--gray-300);
          text-align: center;
          font-size: 1rem;
          -moz-appearance: textfield;
        }
        
        .qty-input::-webkit-outer-spin-button,
        .qty-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        .add-to-cart-btn {
          flex: 1;
          height: 45px;
          border: none;
          border-radius: 50px;
          background: var(--primary-color);
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
          transition: all 0.3s ease;
        }
        
        .add-to-cart-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
        }
        
        .add-to-cart-btn.added {
          background: #4CAF50;
        }
        
        .add-to-cart-btn:disabled {
          background: var(--gray-400);
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
        
        .product-features {
          display: flex;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--gray-700);
        }
        
        .feature svg {
          color: var(--primary-color);
        }
        
        .product-tabs {
          margin-bottom: 3rem;
        }
        
        .tabs-header {
          display: flex;
          border-bottom: 1px solid var(--gray-200);
          margin-bottom: 2rem;
        }
        
        .tab-btn {
          padding: 1rem 1.5rem;
          background: transparent;
          border: none;
          border-bottom: 3px solid transparent;
          color: var(--gray-600);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .tab-btn.active {
          color: var(--primary-color);
          border-bottom-color: var(--primary-color);
        }
        
        .tab-content {
          padding: 1rem;
          min-height: 200px;
        }
        
        .specifications .spec-item {
          display: flex;
          border-bottom: 1px solid var(--gray-100);
          padding: 0.75rem 0;
        }
        
        .specifications .spec-label {
          flex: 0 0 200px;
          font-weight: 600;
          color: var(--gray-700);
        }
        
        .shipping h3 {
          color: var(--gray-800);
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .shipping ul {
          padding-left: 1.5rem;
        }
        
        .shipping li {
          margin-bottom: 0.5rem;
          color: var(--gray-700);
        }
        
        .related-products {
          margin-top: 4rem;
        }
        
        .related-products h2 {
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
          color: var(--gray-800);
          position: relative;
          display: inline-block;
        }
        
        .related-products h2::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          border-radius: 3px;
        }
        
        .related-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .related-product-card {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .related-product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .related-product-link {
          text-decoration: none;
          color: inherit;
        }
        
        .related-product-image {
          height: 200px;
          background-size: cover;
          background-position: center;
        }
        
        .related-product-info {
          padding: 1.2rem;
        }
        
        .related-product-info h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          color: var(--gray-800);
        }
        
        .related-product-price {
          margin: 0;
          font-weight: 700;
          color: var(--primary-color);
        }
        
        @media (max-width: 991px) {
          .product-details-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .product-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          
          .product-features {
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .tabs-header {
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 0.5rem;
          }
          
          .tab-btn {
            padding: 0.75rem 1rem;
          }
          
          .related-products-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .product-price {
            font-size: 1.75rem;
          }
          
          .product-actions {
            flex-direction: column;
          }
          
          .quantity-selector {
            width: 100%;
          }
          
          .related-products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetails; 