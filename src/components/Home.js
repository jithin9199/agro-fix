import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight,
  faAppleAlt,
  faCarrot,
  faShippingFast,
  faCheckCircle,
  faShoppingCart,
  faBoxOpen,
  faHandshake,
  faLeaf,
  faStar,
  faClock,
  faPercent,
  faTag,
  faTruck,
  faShieldAlt,
  faThumbsUp,
  faArrowDown,
  faHeartbeat,
  faWater,
  faSearch,
  faChevronRight,
  faQuoteLeft,
  faQuoteRight,
  faImage,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { initScrollAnimations, initParallaxEffect } from '../utils/animations';
import ProductCard from './ProductCard';

const Home = () => {
  const { products, addToCart, featuredProducts, navigateToCategory, isLoading } = useAppContext();
  const [fruitProducts, setFruitProducts] = useState([]);
  const [vegetableProducts, setVegetableProducts] = useState([]);
  const [organicProducts, setOrganicProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [activeTab, setActiveTab] = useState('fruits');
  const [showProductActions, setShowProductActions] = useState({});
  const [favorites, setFavorites] = useState([]);
  
  const heroRef = useRef(null);
  const scrollToRef = useRef(null);
  const testimonialsRef = useRef(null);
  const statsRef = useRef(null);

  // Init parallax effect
  useEffect(() => {
    const cleanup = initParallaxEffect(heroRef);
    return cleanup;
  }, []);

  // Init scroll animations
  useEffect(() => {
    initScrollAnimations();
  }, []);

  // Prepare product data
  useEffect(() => {
    if (products && products.length > 0) {
      // Categorize products
      setFruitProducts(products.filter(p => p.category === 'Fruits').slice(0, 4));
      setVegetableProducts(products.filter(p => p.category === 'Vegetables').slice(0, 4));
      setOrganicProducts(products.filter(p => 
        p.category === 'Organic' || p.name.toLowerCase().includes('organic')
      ).slice(0, 4));
      
      // Set bestsellers (in a real app, this would be based on sales data)
      const topProducts = [...products]
        .sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5))
        .slice(0, 3);
      
      setBestSellers(topProducts);
    }
  }, [products]);

  const handleMouseEnter = (productId) => {
    setShowProductActions(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const handleMouseLeave = (productId) => {
    setShowProductActions(prev => ({
      ...prev,
      [productId]: false
    }));
  };

  const handleAddToCart = (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart(product, 1);
  };

  const scrollToContent = () => {
    scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(prev => prev.filter(id => id !== productId));
    } else {
      setFavorites(prev => [...prev, productId]);
    }
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Fresh Foods Market",
      position: "Procurement Manager",
      quote: "Agro-Fixx has transformed our supply chain. Their reliable delivery and premium quality produce have helped us increase customer satisfaction by 30%.",
      image: "https://randomuser.me/api/portraits/women/11.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Green Leaf Restaurants",
      position: "Executive Chef",
      quote: "As a chef, quality is everything. Agro-Fixx consistently delivers the freshest ingredients that meet our high standards. Their organic selection is exceptional.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "Sunrise Catering",
      position: "Owner",
      quote: "The team at Agro-Fixx understands our business needs perfectly. Their flexible bulk packaging options and dependable delivery have been crucial to our growth.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  // Statistics data
  const stats = [
    { label: "Tons Delivered", value: "15,000+", icon: faTruck },
    { label: "Business Clients", value: "500+", icon: faUsers },
    { label: "Product Varieties", value: "120+", icon: faBoxOpen },
    { label: "Years of Experience", value: "12+", icon: faLeaf }
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Parallax Effect */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-overlay"></div>
        <div className="hero-content animate-on-scroll">
          <div className="pre-title">Premium Wholesale Produce Supplier</div>
          <h1 className="hero-title">
            <span className="highlight">Bulk Orders</span> of Fresh 
            <span className="highlight"> Fruits & Vegetables</span>
          </h1>
          <p className="hero-subtitle">
            Wholesale produce at competitive prices for businesses. Streamlined ordering and reliable delivery for restaurants, grocers, and food service companies.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn btn-primary">
              Order in Bulk <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Request Quote <FontAwesomeIcon icon={faHandshake} />
            </Link>
          </div>
          <div className="hero-trust-badges">
            <div className="trust-badge">
              <FontAwesomeIcon icon={faShippingFast} />
              <span>Wholesale Delivery</span>
            </div>
            <div className="trust-badge">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Quality Guaranteed</span>
            </div>
            <div className="trust-badge">
              <FontAwesomeIcon icon={faTag} />
              <span>Bulk Discounts</span>
            </div>
          </div>
          <button className="scroll-down-btn" onClick={scrollToContent}>
            <FontAwesomeIcon icon={faArrowDown} className="pulse-effect" />
            <span>View Products</span>
          </button>
        </div>
      </section>

      <div ref={scrollToRef}></div>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-card animate-on-scroll">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faHeartbeat} />
              </div>
              <h3>Farm Fresh Quality</h3>
              <p>Direct-from-farm produce at peak freshness and nutritional value</p>
            </div>
            
            <div className="benefit-card animate-on-scroll">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faShippingFast} />
              </div>
              <h3>Reliable Logistics</h3>
              <p>Temperature-controlled delivery with guaranteed delivery windows</p>
            </div>
            
            <div className="benefit-card animate-on-scroll">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faWater} />
              </div>
              <h3>Sustainable Practices</h3>
              <p>Environmentally responsible farming and distribution methods</p>
            </div>
            
            <div className="benefit-card animate-on-scroll">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faPercent} />
              </div>
              <h3>Wholesale Pricing</h3>
              <p>Competitive rates scaled for business quantities with volume discounts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="category-showcase">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-tag">Bulk Ordering</div>
            <h2>Wholesale Categories</h2>
            <p>Order premium quality fruits and vegetables in bulk for your business needs</p>
          </div>
          
          <div className="category-grid">
            <div className="category-card animate-on-scroll">
              <div className="category-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="category-overlay"></div>
                <div className="category-label">Wholesale</div>
                <div className="category-icon">
                  <FontAwesomeIcon icon={faAppleAlt} />
                </div>
              </div>
              <div className="category-content">
                <h3>Bulk Fruits</h3>
                <p>Premium quality fruits in bulk quantities - apples, oranges, berries, and more at wholesale prices</p>
                <button onClick={() => navigateToCategory('Fruits')} className="category-link">
                  View Bulk Pricing <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            
            <div className="category-card animate-on-scroll">
              <div className="category-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1467019972079-a273e1bc9173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="category-overlay"></div>
                <div className="category-label">Wholesale</div>
                <div className="category-icon">
                  <FontAwesomeIcon icon={faCarrot} />
                </div>
              </div>
              <div className="category-content">
                <h3>Bulk Vegetables</h3>
                <p>Fresh vegetables in large quantities - potatoes, onions, tomatoes, and greens for restaurants and retailers</p>
                <button onClick={() => navigateToCategory('Vegetables')} className="category-link">
                  View Bulk Pricing <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            
            <div className="category-card animate-on-scroll">
              <div className="category-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="category-overlay"></div>
                <div className="category-label">Wholesale</div>
                <div className="category-icon">
                  <FontAwesomeIcon icon={faBoxOpen} />
                </div>
              </div>
              <div className="category-content">
                <h3>Wholesale Packages</h3>
                <p>Custom mixed packages of fruits and vegetables at volume discounts for food service businesses</p>
                <button onClick={() => navigateToCategory('Packages')} className="category-link">
                  View Bulk Pricing <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card animate-on-scroll" key={index}>
                <div className="stat-icon">
                  <FontAwesomeIcon icon={stat.icon} />
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="product-tabs-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-tag">Top Selections</div>
            <h2>Featured Products</h2>
            <p>Our carefully selected premium products for your business needs</p>
          </div>
          
          <div className="product-tabs animate-on-scroll">
            <button 
              className={`tab-button ${activeTab === 'fruits' ? 'active' : ''}`} 
              onClick={() => setActiveTab('fruits')}
            >
              <FontAwesomeIcon icon={faAppleAlt} />
              <span>Fruits</span>
            </button>
            <button 
              className={`tab-button ${activeTab === 'vegetables' ? 'active' : ''}`} 
              onClick={() => setActiveTab('vegetables')}
            >
              <FontAwesomeIcon icon={faCarrot} />
              <span>Vegetables</span>
            </button>
            <button 
              className={`tab-button ${activeTab === 'organic' ? 'active' : ''}`} 
              onClick={() => setActiveTab('organic')}
            >
              <FontAwesomeIcon icon={faLeaf} />
              <span>Organic</span>
            </button>
          </div>
          
          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading premium products...</p>
            </div>
          ) : (
            <div className="products-grid">
              {activeTab === 'fruits' && fruitProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                />
              ))}
              {activeTab === 'vegetables' && vegetableProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                />
              ))}
              {activeTab === 'organic' && organicProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                />
              ))}
            </div>
          )}
          
          <div className="view-all-container animate-on-scroll">
            <Link to="/products" className="btn btn-primary">
              View All Products <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" ref={testimonialsRef}>
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-tag">Client Stories</div>
            <h2>What Our Clients Say</h2>
            <p>Trusted by businesses across various industries</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="testimonial-card animate-on-scroll" key={testimonial.id}>
                <div className="quote-icon">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </div>
                <div className="testimonial-content">
                  <p className="testimonial-quote">{testimonial.quote}</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                    <p className="company-name">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bestsellers-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-tag">Customer Favorites</div>
            <h2>Best Sellers</h2>
            <p>Our most popular products loved by businesses nationwide</p>
          </div>
          
          <div className="bestsellers-grid">
            {bestSellers.map(product => (
              <div key={product.id} className="bestseller-card animate-on-scroll">
                <div className="bestseller-rank">
                  <FontAwesomeIcon icon={faStar} className="rank-icon" />
                  <span>Top Rated</span>
                </div>
                
                <Link to={`/product/${product.id}`} className="bestseller-image-link">
                  <div 
                    className="bestseller-image" 
                    style={{ 
                      backgroundImage: `url(${product.imageUrl || product.image || `https://source.unsplash.com/500x400/?${product.name.replace(' ', ',')}`})` 
                    }}
                  ></div>
                </Link>
                
                <div className="bestseller-content">
                  <Link to={`/product/${product.id}`} className="bestseller-title-link">
                    <h3>{product.name}</h3>
                  </Link>
                  
                  <div className="bestseller-rating">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon 
                        key={i} 
                        icon={faStar} 
                        className={i < Math.floor(product.rating || 4.5) ? "star-filled" : "star-empty"} 
                      />
                    ))}
                    <span className="rating-value">{product.rating?.toFixed(1) || "4.5"}</span>
                  </div>
                  
                  <div className="bestseller-price">${product.price.toFixed(2)} / {product.unit || 'unit'}</div>
                  
                  <button 
                    className="btn-add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-grid">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-tag">Our Promise</div>
            <h2>The Agro-Fixx Advantage</h2>
            <p>Why businesses choose us as their wholesale produce supplier</p>
          </div>
          
          <div className="values-cards">
            <div className="value-card animate-on-scroll">
              <div className="value-icon">
                <FontAwesomeIcon icon={faBoxOpen} />
              </div>
              <h3>Bulk Packaging</h3>
              <p>Custom packaging solutions optimized for wholesale quantities and efficient handling</p>
            </div>
            
            <div className="value-card animate-on-scroll">
              <div className="value-icon">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <h3>Reliable Delivery</h3>
              <p>Temperature-controlled logistics with guaranteed delivery windows</p>
            </div>
            
            <div className="value-card animate-on-scroll">
              <div className="value-icon">
                <FontAwesomeIcon icon={faShieldAlt} />
              </div>
              <h3>Quality Control</h3>
              <p>Rigorous quality assurance processes ensuring only the best produce reaches you</p>
            </div>
            
            <div className="value-card animate-on-scroll">
              <div className="value-icon">
                <FontAwesomeIcon icon={faHandshake} />
              </div>
              <h3>Business Support</h3>
              <p>Dedicated account managers to help optimize your ordering process</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <div className="cta-tag">Ready to Scale Your Business?</div>
            <h2>Start Ordering Premium Wholesale Produce Today</h2>
            <p>Join hundreds of successful businesses that trust Agro-Fixx for their produce needs</p>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-primary">
                Browse Products <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Sales <FontAwesomeIcon icon={faHandshake} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 