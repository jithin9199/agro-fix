import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTh, 
  faList, 
  faFilter, 
  faSearch, 
  faTimes,
  faAppleAlt,
  faCarrot,
  faLeaf,
  faTag,
  faStar,
  faPercentage,
  faSortAmountDown,
  faSortAmountUp,
  faCheckCircle,
  faSlidersH,
  faAngleRight,
  faSync,
  faAward,
  faShippingFast,
  faPercent,
  faBoxOpen,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/AppContext';
import ProductCard from '../ProductCard';
import { initScrollAnimations } from '../../utils/animations';

const ProductCatalog = () => {
  const { 
    categories, 
    filters, 
    setFilters, 
    isLoading, 
    error,
    getFilteredProducts
  } = useAppContext();

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [resultMessage, setResultMessage] = useState('');

  // Initialize animations for scroll elements
  useEffect(() => {
    initScrollAnimations();
  }, []);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.searchQuery) count++;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (showOnlyInStock) count++;
    if (showOnlyDiscount) count++;
    setFilterCount(count);
    
    // Update result message
    updateResultMessage(getProducts());
  }, [filters, showOnlyInStock, showOnlyDiscount]);

  // Update result message based on filters
  const updateResultMessage = (products) => {
    if (products.length === 0) {
      setResultMessage('No products match your current filters');
      return;
    }
    
    let message = `Showing ${products.length} product${products.length !== 1 ? 's' : ''}`;
    if (filters.category) {
      message += ` in ${filters.category}`;
    }
    
    if (filters.searchQuery) {
      message += ` matching "${filters.searchQuery}"`;
    }
    
    setResultMessage(message);
  };

  // Handle price filter change
  const handlePriceChange = (e, type) => {
    setFilters(prev => ({
      ...prev,
      [type]: e.target.value
    }));
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: e.target.value
    }));
  };

  // Handle sort change
  const handleSortChange = (sortValue) => {
    setFilters(prev => ({
      ...prev,
      sortBy: sortValue
    }));
  };

  // Toggle favorite status
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(prev => prev.filter(id => id !== productId));
    } else {
      setFavorites(prev => [...prev, productId]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: '',
      searchQuery: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name'
    });
    setShowOnlyInStock(false);
    setShowOnlyDiscount(false);
    setActiveTab('all');
  };

  // Set category via tab or filter
  const setCategory = (category) => {
    setFilters(prev => ({...prev, category: category}));
    setActiveTab(category || 'all');
    
    // Close mobile filters if open
    if (showMobileFilters) {
      setShowMobileFilters(false);
    }
  };

  // Get filtered and sorted products with additional filters
  const getProducts = () => {
    let productList = getFilteredProducts();
    
    // Apply in-stock filter
    if (showOnlyInStock) {
      productList = productList.filter(product => product.stockQuantity > 0);
    }
    
    // Apply discount filter
    if (showOnlyDiscount) {
      productList = productList.filter(product => 
        (product.discountPercent && product.discountPercent > 0) || 
        (product.originalPrice && product.originalPrice > product.price)
      );
    }
    
    return productList;
  };

  // Group products by category
  const filteredProducts = getProducts();
  
  const fruitProducts = filteredProducts.filter(product => product.category === 'Fruits');
  const vegetableProducts = filteredProducts.filter(product => product.category === 'Vegetables');
  const organicProducts = filteredProducts.filter(product => product.category === 'Organic');
  const otherProducts = filteredProducts.filter(product => 
    product.category !== 'Fruits' && 
    product.category !== 'Vegetables' && 
    product.category !== 'Organic'
  );

  // Get category count
  const getCategoryCount = (category) => {
    return getProducts().filter(product => category ? product.category === category : true).length;
  };

  // Toggle view mode
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Fruits':
        return faAppleAlt;
      case 'Vegetables':
        return faCarrot;
      case 'Organic':
        return faLeaf;
      default:
        return faBoxOpen;
    }
  };

  const renderProducts = (products) => {
    if (products.length === 0) {
      return (
        <div className="no-products-message animate-on-scroll">
          <FontAwesomeIcon icon={faTimes} />
          <p>No products found matching your criteria</p>
          <button className="reset-filters-button" onClick={resetFilters}>
            <FontAwesomeIcon icon={faSync} /> Reset Filters
          </button>
        </div>
      );
    }
    
    return (
      <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
        {products.map(product => (
          <div key={product.id} className="product-grid-item animate-on-scroll">
            <ProductCard 
              product={product} 
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="product-catalog">
      <div className="catalog-hero animate-on-scroll">
        <div className="catalog-hero-content">
          <h1>Our Product Catalog</h1>
          <p>Premium quality wholesale produce sourced directly from farms</p>
          <div className="catalog-badges">
            <div className="catalog-badge">
              <FontAwesomeIcon icon={faShippingFast} />
              <span>Fast Delivery</span>
            </div>
            <div className="catalog-badge">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Quality Guaranteed</span>
            </div>
            <div className="catalog-badge">
              <FontAwesomeIcon icon={faPercent} />
              <span>Wholesale Prices</span>
            </div>
            <div className="catalog-badge">
              <FontAwesomeIcon icon={faAward} />
              <span>Premium Selection</span>
            </div>
          </div>
        </div>
      </div>

      <div className="category-tabs-container animate-on-scroll">
        <div className="category-tabs">
          <button 
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`} 
            onClick={() => setCategory('')}
          >
            <span>All Products</span>
            <span className="tab-count">{getCategoryCount()}</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'Fruits' ? 'active' : ''}`} 
            onClick={() => setCategory('Fruits')}
          >
            <FontAwesomeIcon icon={faAppleAlt} />
            <span>Fruits</span>
            <span className="tab-count">{getCategoryCount('Fruits')}</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'Vegetables' ? 'active' : ''}`} 
            onClick={() => setCategory('Vegetables')}
          >
            <FontAwesomeIcon icon={faCarrot} />
            <span>Vegetables</span>
            <span className="tab-count">{getCategoryCount('Vegetables')}</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'Organic' ? 'active' : ''}`} 
            onClick={() => setCategory('Organic')}
          >
            <FontAwesomeIcon icon={faLeaf} />
            <span>Organic</span>
            <span className="tab-count">{getCategoryCount('Organic')}</span>
          </button>
        </div>
      </div>

      <div className="catalog-toolbar animate-on-scroll">
        <div className="search-filter-container">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            {filters.searchQuery && (
              <button 
                className="search-clear-button"
                onClick={() => setFilters(prev => ({...prev, searchQuery: ''}))}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>

          <button 
            className={`filter-toggle-button ${filterCount > 0 ? 'has-filters' : ''}`}
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <FontAwesomeIcon icon={faSlidersH} />
            <span>Filters</span>
            {filterCount > 0 && <span className="filter-count">{filterCount}</span>}
          </button>
        </div>

        <div className="view-options">
          <div className="sort-dropdown">
            <button className="sort-button">
              <FontAwesomeIcon icon={filters.sortBy && filters.sortBy.includes('desc') ? faSortAmountDown : faSortAmountUp} />
              <span>Sort</span>
            </button>
            <div className="sort-options">
              <button 
                className={filters.sortBy === 'name' ? 'active' : ''} 
                onClick={() => handleSortChange('name')}
              >
                Name (A-Z)
              </button>
              <button 
                className={filters.sortBy === 'name-desc' ? 'active' : ''} 
                onClick={() => handleSortChange('name-desc')}
              >
                Name (Z-A)
              </button>
              <button 
                className={filters.sortBy === 'price-asc' ? 'active' : ''} 
                onClick={() => handleSortChange('price-asc')}
              >
                Price (Low to High)
              </button>
              <button 
                className={filters.sortBy === 'price-desc' ? 'active' : ''} 
                onClick={() => handleSortChange('price-desc')}
              >
                Price (High to Low)
              </button>
            </div>
          </div>
          <button 
            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => toggleViewMode('grid')}
            aria-label="Grid view"
          >
            <FontAwesomeIcon icon={faTh} />
          </button>
          <button 
            className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => toggleViewMode('list')}
            aria-label="List view"
          >
            <FontAwesomeIcon icon={faList} />
          </button>
        </div>
      </div>

      <div className="result-summary">
        <span>{resultMessage}</span>
        {filterCount > 0 && (
          <button className="clear-all-filters" onClick={resetFilters}>
            <FontAwesomeIcon icon={faTimes} /> Clear All Filters
          </button>
        )}
      </div>

      <div className="catalog-container">
        <div className={`filters-sidebar ${showMobileFilters ? 'show-mobile' : ''}`}>
          <div className="filters-header">
            <h3>Filter Products</h3>
            <button 
              className="close-filters-button"
              onClick={() => setShowMobileFilters(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="filter-group">
            <label>Category</label>
            <div className="category-options">
              <div 
                className={`category-option ${filters.category === '' ? 'active' : ''}`}
                onClick={() => setCategory('')}
              >
                <span>All Categories</span>
                <span className="count">{getCategoryCount()}</span>
              </div>
              <div 
                className={`category-option ${filters.category === 'Fruits' ? 'active' : ''}`}
                onClick={() => setCategory('Fruits')}
              >
                <span className="option-label">
                  <FontAwesomeIcon icon={faAppleAlt} /> 
                  <span>Fruits</span>
                </span>
                <span className="count">{getCategoryCount('Fruits')}</span>
              </div>
              <div 
                className={`category-option ${filters.category === 'Vegetables' ? 'active' : ''}`}
                onClick={() => setCategory('Vegetables')}
              >
                <span className="option-label">
                  <FontAwesomeIcon icon={faCarrot} /> 
                  <span>Vegetables</span>
                </span>
                <span className="count">{getCategoryCount('Vegetables')}</span>
              </div>
              <div 
                className={`category-option ${filters.category === 'Organic' ? 'active' : ''}`}
                onClick={() => setCategory('Organic')}
              >
                <span className="option-label">
                  <FontAwesomeIcon icon={faLeaf} /> 
                  <span>Organic</span>
                </span>
                <span className="count">{getCategoryCount('Organic')}</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange(e, 'minPrice')}
                className="price-input"
              />
              <span className="price-separator">to</span>
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange(e, 'maxPrice')}
                className="price-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Product Status</label>
            <div className="status-options">
              <div className="status-option">
                <input 
                  type="checkbox" 
                  id="in-stock" 
                  checked={showOnlyInStock} 
                  onChange={() => setShowOnlyInStock(!showOnlyInStock)}
                />
                <label htmlFor="in-stock">
                  <FontAwesomeIcon icon={faCheckCircle} /> In Stock Only
                </label>
              </div>
              <div className="status-option">
                <input 
                  type="checkbox" 
                  id="on-sale" 
                  checked={showOnlyDiscount}
                  onChange={() => setShowOnlyDiscount(!showOnlyDiscount)}
                />
                <label htmlFor="on-sale">
                  <FontAwesomeIcon icon={faPercentage} /> On Sale Only
                </label>
              </div>
            </div>
          </div>

          <div className="filter-actions">
            <button className="reset-filters-button" onClick={resetFilters}>
              <FontAwesomeIcon icon={faSync} /> Reset All Filters
            </button>
            <button className="apply-filters-button" onClick={() => setShowMobileFilters(false)}>
              <FontAwesomeIcon icon={faCheckCircle} /> Apply Filters
            </button>
          </div>
        </div>

        <div className="products-display">
          {isLoading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products-message">
              <FontAwesomeIcon icon={faTimes} className="no-results-icon" />
              <h3>No products found</h3>
              <p>We couldn't find any products matching your criteria.</p>
              <button className="reset-filters-button" onClick={resetFilters}>
                <FontAwesomeIcon icon={faSync} /> Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-wrapper">
              {filters.category === '' ? (
                <>
                  {fruitProducts.length > 0 && (
                    <div className="category-section">
                      <div className="category-header">
                        <h2>
                          <FontAwesomeIcon icon={faAppleAlt} /> 
                          <span>Fruits</span>
                        </h2>
                        <div className="category-actions">
                          <span className="count">{fruitProducts.length} products</span>
                          <button className="view-all" onClick={() => setCategory('Fruits')}>
                            View All <FontAwesomeIcon icon={faAngleRight} />
                          </button>
                        </div>
                      </div>
                      <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                        {fruitProducts.map(product => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            isFavorite={favorites.includes(product.id)}
                            onToggleFavorite={() => toggleFavorite(product.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {vegetableProducts.length > 0 && (
                    <div className="category-section">
                      <div className="category-header">
                        <h2>
                          <FontAwesomeIcon icon={faCarrot} /> 
                          <span>Vegetables</span>
                        </h2>
                        <div className="category-actions">
                          <span className="count">{vegetableProducts.length} products</span>
                          <button className="view-all" onClick={() => setCategory('Vegetables')}>
                            View All <FontAwesomeIcon icon={faAngleRight} />
                          </button>
                        </div>
                      </div>
                      <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                        {vegetableProducts.map(product => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            isFavorite={favorites.includes(product.id)}
                            onToggleFavorite={() => toggleFavorite(product.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {organicProducts.length > 0 && (
                    <div className="category-section">
                      <div className="category-header">
                        <h2>
                          <FontAwesomeIcon icon={faLeaf} /> 
                          <span>Organic Products</span>
                        </h2>
                        <div className="category-actions">
                          <span className="count">{organicProducts.length} products</span>
                          <button className="view-all" onClick={() => setCategory('Organic')}>
                            View All <FontAwesomeIcon icon={faAngleRight} />
                          </button>
                        </div>
                      </div>
                      <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                        {organicProducts.map(product => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            isFavorite={favorites.includes(product.id)}
                            onToggleFavorite={() => toggleFavorite(product.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {otherProducts.length > 0 && (
                    <div className="category-section">
                      <div className="category-header">
                        <h2>
                          <FontAwesomeIcon icon={faBoxOpen} /> 
                          <span>Other Products</span>
                        </h2>
                        <div className="category-actions">
                          <span className="count">{otherProducts.length} products</span>
                        </div>
                      </div>
                      <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                        {otherProducts.map(product => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            isFavorite={favorites.includes(product.id)}
                            onToggleFavorite={() => toggleFavorite(product.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="category-section">
                  <div className="category-header">
                    <h2>
                      <FontAwesomeIcon icon={getCategoryIcon(filters.category)} /> 
                      <span>{filters.category}</span>
                    </h2>
                    <div className="category-actions">
                      <span className="count">{filteredProducts.length} products</span>
                    </div>
                  </div>
                  <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                    {filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        isFavorite={favorites.includes(product.id)}
                        onToggleFavorite={() => toggleFavorite(product.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;