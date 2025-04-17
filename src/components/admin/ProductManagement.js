import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faPlus, 
  faEdit, 
  faTrash, 
  faSave, 
  faTimes,
  faFilter,
  faSort,
  faSortUp,
  faSortDown
} from '@fortawesome/free-solid-svg-icons';

const ProductManagement = () => {
  // Mock product data
  const initialProducts = [
    { id: 1, name: 'Organic Apples', category: 'Fruits', price: 3.99, unit: 'kg', stock: 150, featured: true, image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' },
    { id: 2, name: 'Fresh Carrots', category: 'Vegetables', price: 2.49, unit: 'kg', stock: 200, featured: false, image: 'https://images.unsplash.com/photo-1598170845058-cbca9445903c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' },
    { id: 3, name: 'Premium Oranges', category: 'Fruits', price: 4.25, unit: 'kg', stock: 100, featured: true, image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' },
    { id: 4, name: 'Fresh Tomatoes', category: 'Vegetables', price: 3.50, unit: 'kg', stock: 120, featured: true, image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' },
    { id: 5, name: 'Green Peppers', category: 'Vegetables', price: 2.99, unit: 'kg', stock: 80, featured: false, image: 'https://images.unsplash.com/photo-1518006959466-0db0b6b4c1d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' },
    { id: 6, name: 'Organic Bananas', category: 'Fruits', price: 1.99, unit: 'kg', stock: 250, featured: true, image: 'https://images.unsplash.com/photo-1543218024-57a70143c369?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' },
    { id: 7, name: 'Red Onions', category: 'Vegetables', price: 1.75, unit: 'kg', stock: 180, featured: false, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' },
    { id: 8, name: 'Premium Grapes', category: 'Fruits', price: 5.99, unit: 'kg', stock: 90, featured: true, image: 'https://images.unsplash.com/photo-1516531558361-f3e82a528440?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' }
  ];

  // Component state
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Fruits',
    price: '',
    unit: 'kg',
    stock: '',
    featured: false,
    image: ''
  });

  // Available categories
  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Poultry'];

  // Handler functions
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleFeaturedFilterChange = (e) => {
    setFeaturedFilter(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleAddNewClick = () => {
    setIsAddingProduct(true);
    setIsEditingProduct(null);
  };

  const handleCancelAdd = () => {
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      category: 'Fruits',
      price: '',
      unit: 'kg',
      stock: '',
      featured: false,
      image: ''
    });
  };

  const handleEditClick = (product) => {
    setIsEditingProduct(product.id);
    setNewProduct({ ...product });
    setIsAddingProduct(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProduct(null);
    setNewProduct({
      name: '',
      category: 'Fruits',
      price: '',
      unit: 'kg',
      stock: '',
      featured: false,
      image: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveProduct = () => {
    if (isAddingProduct) {
      // Add new product
      const productToAdd = {
        ...newProduct,
        id: Math.max(...products.map(p => p.id)) + 1,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10)
      };
      setProducts([...products, productToAdd]);
      setIsAddingProduct(false);
    } else if (isEditingProduct) {
      // Update existing product
      const updatedProducts = products.map(product => 
        product.id === isEditingProduct ? 
        { 
          ...newProduct, 
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock, 10)
        } : product
      );
      setProducts(updatedProducts);
      setIsEditingProduct(null);
    }

    // Reset form
    setNewProduct({
      name: '',
      category: 'Fruits',
      price: '',
      unit: 'kg',
      stock: '',
      featured: false,
      image: ''
    });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
    }
  };

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesFeatured = featuredFilter === 'all' || 
      (featuredFilter === 'featured' && product.featured) ||
      (featuredFilter === 'not-featured' && !product.featured);
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FontAwesomeIcon icon={faSort} />;
    return sortConfig.direction === 'ascending' ? 
      <FontAwesomeIcon icon={faSortUp} /> : 
      <FontAwesomeIcon icon={faSortDown} />;
  };

  return (
    <div className="product-management">
      <div className="section-header">
        <h2>Product Management</h2>
        <button className="primary-btn" onClick={handleAddNewClick}>
          <FontAwesomeIcon icon={faPlus} /> Add New Product
        </button>
      </div>

      {/* Filter and search controls */}
      <div className="filter-controls">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="filter-group">
          <FontAwesomeIcon icon={faFilter} />
          <div className="filter-select">
            <label>Category:</label>
            <select value={categoryFilter} onChange={handleCategoryFilterChange}>
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-select">
            <label>Featured:</label>
            <select value={featuredFilter} onChange={handleFeaturedFilterChange}>
              <option value="all">All Products</option>
              <option value="featured">Featured Only</option>
              <option value="not-featured">Not Featured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Form for adding/editing products */}
      {(isAddingProduct || isEditingProduct) && (
        <div className="product-form">
          <h3>{isAddingProduct ? 'Add New Product' : 'Edit Product'}</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select 
                name="category" 
                value={newProduct.category}
                onChange={handleInputChange}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Unit</label>
              <select 
                name="unit" 
                value={newProduct.unit}
                onChange={handleInputChange}
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="pcs">Piece (pcs)</option>
                <option value="dozen">Dozen</option>
                <option value="lb">Pound (lb)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                min="0"
                value={newProduct.stock}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={newProduct.featured}
                  onChange={handleInputChange}
                />
                Featured Product
              </label>
            </div>
          </div>
          
          <div className="form-actions">
            <button className="primary-btn" onClick={handleSaveProduct}>
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
            <button className="secondary-btn" onClick={isAddingProduct ? handleCancelAdd : handleCancelEdit}>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>
                ID {getSortIcon('id')}
              </th>
              <th onClick={() => handleSort('name')}>
                Name {getSortIcon('name')}
              </th>
              <th onClick={() => handleSort('category')}>
                Category {getSortIcon('category')}
              </th>
              <th onClick={() => handleSort('price')}>
                Price {getSortIcon('price')}
              </th>
              <th onClick={() => handleSort('stock')}>
                Stock {getSortIcon('stock')}
              </th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <div className="product-name">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="product-thumbnail" />
                    )}
                    {product.name}
                  </div>
                </td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)} / {product.unit}</td>
                <td className={product.stock < 50 ? 'low-stock' : ''}>
                  {product.stock} {product.stock < 50 && <span className="warning-text">(Low)</span>}
                </td>
                <td>
                  <span className={`status-indicator ${product.featured ? 'featured' : 'not-featured'}`}>
                    {product.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn edit"
                      onClick={() => handleEditClick(product)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {sortedProducts.length === 0 && (
          <div className="no-results">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement; 