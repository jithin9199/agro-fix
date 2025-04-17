import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faEdit, 
  faTrash, 
  faPlus, 
  faSave, 
  faTimes, 
  faSort,
  faFilter,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const InventoryManagement = () => {
  const { products } = useAppContext();
  
  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [editingProduct, setEditingProduct] = useState(null);
  
  // For product editing (would connect to context in a real app)
  const [editForm, setEditForm] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
    image: ''
  });
  
  // Calculate unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Filter by search term
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (categoryFilter !== 'all' && product.category !== categoryFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected order
      switch (sortOrder) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return a.name.localeCompare(b.name);
      }
    });
  
  const handleEditClick = (product) => {
    setEditingProduct(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image
    });
  };
  
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };
  
  const handleSaveEdit = (id) => {
    // In a real app, this would update the product in the context and potentially in a database
    console.log(`Saving changes to product ${id}:`, editForm);
    setEditingProduct(null);
    
    // Since we can't actually update the data in this demo, just show a message
    alert('Product updated successfully! (Note: This is a demo, changes are not persisted.)');
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    });
  };
  
  return (
    <div className="inventory-management">
      <div className="admin-section-header">
        <h2>Inventory Management</h2>
        <p>Manage your product catalog</p>
      </div>
      
      <div className="admin-controls">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="category-filter">
              <FontAwesomeIcon icon={faFilter} /> Category:
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="sort-order">
              <FontAwesomeIcon icon={faSort} /> Sort by:
            </label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="filter-select"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="action-bar">
        <button className="btn-primary add-product-btn">
          <FontAwesomeIcon icon={faPlus} /> Add New Product
        </button>
      </div>
      
      <div className="product-summary">
        <span className="product-count">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </span>
        
        {categoryFilter !== 'all' && (
          <span className="filter-badge">
            Category: {categoryFilter}
            <button 
              className="clear-filter" 
              onClick={() => setCategoryFilter('all')}
              aria-label="Clear filter"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </span>
        )}
        
        {searchTerm && (
          <span className="filter-badge">
            Search: "{searchTerm}"
            <button 
              className="clear-filter" 
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </span>
        )}
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <div className="empty-state">
            <FontAwesomeIcon icon={faExclamationTriangle} className="empty-icon" />
            <h3>No products found</h3>
            <p>No products match your current filters.</p>
            <button 
              className="btn-primary"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="products-table">
          <div className="product-row header">
            <div className="product-cell image">Image</div>
            <div className="product-cell name">Name</div>
            <div className="product-cell category">Category</div>
            <div className="product-cell price">Price</div>
            <div className="product-cell actions">Actions</div>
          </div>
          
          {filteredProducts.map(product => (
            <div key={product.id} className="product-row">
              {editingProduct === product.id ? (
                // Edit mode
                <>
                  <div className="product-cell image">
                    <img src={editForm.image || 'https://via.placeholder.com/50x50?text=' + product.name} alt={product.name} />
                    <input
                      type="text"
                      name="image"
                      value={editForm.image}
                      onChange={handleInputChange}
                      placeholder="Image URL"
                      className="edit-input"
                    />
                  </div>
                  <div className="product-cell name">
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      placeholder="Product name"
                      className="edit-input"
                      required
                    />
                  </div>
                  <div className="product-cell category">
                    <select
                      name="category"
                      value={editForm.category}
                      onChange={handleInputChange}
                      className="edit-select"
                      required
                    >
                      {categories
                        .filter(cat => cat !== 'all')
                        .map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="product-cell price">
                    <div className="price-edit">
                      <span className="currency">$</span>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className="edit-input price-input"
                        required
                      />
                      <span className="unit">/kg</span>
                    </div>
                  </div>
                  <div className="product-cell actions">
                    <div className="edit-actions">
                      <button 
                        className="action-btn save-btn"
                        onClick={() => handleSaveEdit(product.id)}
                        aria-label="Save changes"
                      >
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button 
                        className="action-btn cancel-btn"
                        onClick={handleCancelEdit}
                        aria-label="Cancel editing"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // View mode
                <>
                  <div className="product-cell image">
                    <img src={product.image || 'https://via.placeholder.com/50x50?text=' + product.name} alt={product.name} />
                  </div>
                  <div className="product-cell name">{product.name}</div>
                  <div className="product-cell category">{product.category}</div>
                  <div className="product-cell price">${product.price.toFixed(2)}/kg</div>
                  <div className="product-cell actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEditClick(product)}
                      aria-label="Edit product"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => alert('Delete functionality would be implemented in a real application')}
                      aria-label="Delete product"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="description-section">
        {editingProduct && (
          <div className="description-edit">
            <h4>Product Description</h4>
            <textarea
              name="description"
              value={editForm.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows="4"
              className="edit-textarea"
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManagement; 