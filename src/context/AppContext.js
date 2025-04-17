import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../api/apiService';

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [page, setPage] = useState('home');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    searchQuery: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name'
  });
  // Add order tracking state
  const [orders, setOrders] = useState([]);
  const [trackingId, setTrackingId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [adminSection, setAdminSection] = useState('orders');
  const [currentUser, setCurrentUser] = useState(null);
  
  // Handle initial page loading
  useEffect(() => {
    // If a hash exists in the URL, set the page accordingly
    const hash = window.location.hash.slice(1);
    if (hash) {
      if (hash.startsWith('category-')) {
        const category = hash.replace('category-', '');
        navigateToCategory(category);
      } else {
        setPage(hash);
      }
    } else {
      // Ensure we're on the home page if no hash is present
      setPage('home');
      // Set the hash to match
      window.location.hash = 'home';
    }
  }, []);
  
  // Handle page navigation with category filtering
  const navigateToCategory = (categoryName) => {
    setFilters(prev => ({
      ...prev,
      category: categoryName === 'all' ? '' : categoryName
    }));
    setPage('products');
    window.location.hash = categoryName === 'all' ? 'products' : `category-${categoryName}`;
  };
  
  // Reset filters when needed
  const resetFilters = () => {
    setFilters({
      category: '',
      searchQuery: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name'
    });
  };
  
  // Effect to handle category navigation from URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('category-')) {
        const category = hash.replace('category-', '');
        navigateToCategory(category);
      } else if (hash) {
        setPage(hash);
      }
    };
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Add order functions
  const submitOrder = (customerInfo) => {
    const newOrder = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      date: new Date().toISOString(),
      customerName: customerInfo.name,
      contactInfo: customerInfo.contactInfo,
      deliveryAddress: customerInfo.address,
      notes: customerInfo.notes || '',
      status: 'Pending',
      items: [...cartItems]
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
    return newOrder.id;
  };

  const trackOrder = (id = null) => {
    const orderId = id || trackingId;
    if (!orderId) return null;
    
    const foundOrder = orders.find(order => order.id === orderId);
    setTrackedOrder(foundOrder || null);
    return foundOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    if (trackedOrder && trackedOrder.id === orderId) {
      setTrackedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Calculate total for any list of items
  const calculateTotal = (items = cartItems) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getFilteredProducts = () => {
    return products.filter(product => {
      // Filter by category
      if (filters.category && filters.category !== '' && product.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      
      // Filter by search query
      if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by price range
      if (filters.minPrice && product.price < parseFloat(filters.minPrice)) {
        return false;
      }
      
      if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort products
      switch(filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  };

  // Set URL hash when page changes
  useEffect(() => {
    if (page) {
      window.location.hash = page;
    }
  }, [page]);

  // Fetch products on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        
        // Mock data for development (simulating API response)
        const mockProducts = [
          {
            id: '1',
            name: 'Fresh Apples',
            price: 24.99,
            imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            category: 'Fruits',
            unit: '10kg box',
            description: 'Premium fresh apples, perfect for retail or restaurant use. Sold in bulk boxes.',
            featured: true
          },
          {
            id: '2',
            name: 'Organic Bananas',
            price: 19.99,
            imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            category: 'Fruits',
            unit: '15kg box',
            description: 'Organically grown bananas, sourced from sustainable farms. Ideal for smoothies and baking.',
            featured: true
          },
          {
            id: '3',
            name: 'Fresh Carrots',
            price: 15.99,
            imageUrl: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            category: 'Vegetables',
            unit: '10kg sack',
            description: 'Fresh garden carrots, perfect for restaurants and catering businesses.',
            featured: true
          },
          {
            id: '4',
            name: 'Red Potatoes',
            price: 18.99,
            imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            category: 'Vegetables',
            unit: '20kg sack',
            description: 'Premium red potatoes, perfect for roasting and boiling. Ideal for restaurants and catering.',
            featured: true
          },
          {
            id: '5',
            name: 'Organic Strawberries',
            price: 32.99,
            imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            category: 'Fruits',
            unit: '8kg tray',
            description: 'Sweet and juicy organic strawberries. Perfect for desserts and fruit platters.',
            featured: false
          },
          {
            id: '6',
            name: 'Fresh Broccoli',
            price: 22.99,
            imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            category: 'Vegetables',
            unit: '10kg case',
            description: 'Farm-fresh broccoli in convenient bulk packaging for food service professionals.',
            featured: false
          },
          {
            id: '7',
            name: 'Organic Avocados',
            price: 35.99,
            imageUrl: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            category: 'Fruits',
            unit: '5kg box',
            description: 'Premium organic avocados, perfectly ripened and ready to use.',
            featured: false
          },
          {
            id: '8',
            name: 'Fresh Tomatoes',
            price: 21.99,
            imageUrl: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            category: 'Vegetables',
            unit: '10kg box',
            description: 'Vine-ripened tomatoes, perfect for sauces, salads, and sandwiches.',
            featured: false
          }
        ];
        
        const mockCategories = [
          { id: '1', name: 'Fruits' },
          { id: '2', name: 'Vegetables' },
          { id: '3', name: 'Organic' }
        ];
        
        setProducts(mockProducts);
        setFeaturedProducts(mockProducts.filter(p => p.featured));
        setCategories(mockCategories);
        
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Filter products whenever filters change
  useEffect(() => {
    if (!isLoading) {
      // Just using the getFilteredProducts function instead of making an API call
      // This ensures the filters are applied to the existing products
      setIsLoading(false);
    }
  }, [filters, isLoading]);

  const value = {
    page,
    setPage,
    products,
    categories,
    featuredProducts,
    isLoading,
    error,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    calculateTotal,
    filters,
    setFilters,
    getFilteredProducts,
    orders,
    submitOrder,
    trackingId,
    setTrackingId,
    trackedOrder,
    trackOrder,
    updateOrderStatus,
    adminSection,
    setAdminSection,
    navigateToCategory,
    resetFilters,
    currentUser,
    setCurrentUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook for using context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext; 