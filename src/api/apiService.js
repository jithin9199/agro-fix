/**
 * API Service for handling data operations
 * Currently uses mock data, but can be switched to real API calls
 */

import mockData from './mockData';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service for development
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

// Filter and sort products based on query parameters
const filterProducts = (filters) => {
  return mockProducts.filter(product => {
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
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });
};

// API Service object
const apiService = {
  // Product related API calls
  products: {
    // Get all products with optional filters
    getAll: async (filters = {}) => {
      await delay(300); // Simulate network delay
      return filterProducts(filters);
    },
    
    // Get featured products
    getFeatured: async () => {
      await delay(300);
      return mockProducts.filter(product => product.featured);
    },
    
    // Get a single product by ID
    getById: async (id) => {
      await delay(200);
      return mockProducts.find(product => product.id === id);
    },
    
    // Create a new product (admin only)
    create: async (productData) => {
      await delay(500);
      const newProduct = {
        id: Math.max(...mockProducts.map(p => p.id)) + 1,
        ...productData
      };
      mockProducts.push(newProduct);
      return newProduct;
    },
    
    // Update an existing product (admin only)
    update: async (id, productData) => {
      await delay(500);
      const index = mockProducts.findIndex(product => product.id === id);
      if (index !== -1) {
        mockProducts[index] = { ...mockProducts[index], ...productData };
        return mockProducts[index];
      }
      throw new Error("Product not found");
    },
    
    // Delete a product (admin only)
    delete: async (id) => {
      await delay(500);
      const index = mockProducts.findIndex(product => product.id === id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
        return { success: true };
      }
      throw new Error("Product not found");
    }
  },
  
  // Category related API calls
  categories: {
    // Get all categories
    getAll: async () => {
      await delay(200);
      return mockCategories;
    },
    
    // Get a single category by ID
    getById: async (id) => {
      await delay(200);
      return mockCategories.find(category => category.id === id);
    }
  },
  
  // Order related API calls
  orders: {
    // Get all orders (admin only)
    getAll: async () => {
      await delay(400);
      return mockData.orders;
    },
    
    // Get orders for a specific customer
    getByCustomer: async (customerId) => {
      await delay(300);
      return mockData.orders.filter(order => order.customerId === customerId);
    },
    
    // Get a single order by ID
    getById: async (id) => {
      await delay(200);
      return mockData.orders.find(order => order.id === id);
    },
    
    // Create a new order
    create: async (orderData) => {
      await delay(600);
      const newOrder = {
        id: Math.max(...mockData.orders.map(o => o.id)) + 1,
        orderDate: new Date().toISOString(),
        status: "Pending",
        deliveryDate: null,
        ...orderData
      };
      mockData.orders.push(newOrder);
      return newOrder;
    },
    
    // Update order status (admin only)
    updateStatus: async (id, status) => {
      await delay(300);
      const index = mockData.orders.findIndex(order => order.id === id);
      if (index !== -1) {
        mockData.orders[index].status = status;
        if (status === "Delivered") {
          mockData.orders[index].deliveryDate = new Date().toISOString();
        }
        return mockData.orders[index];
      }
      throw new Error("Order not found");
    }
  },
  
  // Customer related API calls
  customers: {
    // Get all customers (admin only)
    getAll: async () => {
      await delay(400);
      return mockData.customers;
    },
    
    // Get a single customer by ID
    getById: async (id) => {
      await delay(200);
      return mockData.customers.find(customer => customer.id === id);
    },
    
    // Create a new customer (registration)
    create: async (customerData) => {
      await delay(500);
      const newCustomer = {
        id: Math.max(...mockData.customers.map(c => c.id)) + 1,
        registrationDate: new Date().toISOString(),
        ...customerData
      };
      mockData.customers.push(newCustomer);
      return newCustomer;
    },
    
    // Update customer information
    update: async (id, customerData) => {
      await delay(400);
      const index = mockData.customers.findIndex(customer => customer.id === id);
      if (index !== -1) {
        mockData.customers[index] = { ...mockData.customers[index], ...customerData };
        return mockData.customers[index];
      }
      throw new Error("Customer not found");
    }
  },
  
  // Inventory related API calls (admin only)
  inventory: {
    // Get all inventory transactions
    getTransactions: async () => {
      await delay(300);
      return mockData.inventoryTransactions;
    },
    
    // Record a new inventory transaction
    addTransaction: async (transactionData) => {
      await delay(400);
      const newTransaction = {
        id: Math.max(...mockData.inventoryTransactions.map(t => t.id)) + 1,
        date: new Date().toISOString(),
        ...transactionData
      };
      mockData.inventoryTransactions.push(newTransaction);
      
      // Update product stock quantity
      const product = mockProducts.find(p => p.id === transactionData.productId);
      if (product) {
        product.stockQuantity += transactionData.quantity;
      }
      
      return newTransaction;
    }
  },
  
  // Analytics data (admin only)
  analytics: {
    // Get sales summary
    getSummary: async () => {
      await delay(500);
      return mockData.analytics.summary;
    },
    
    // Get sales by category
    getSalesByCategory: async () => {
      await delay(400);
      return mockData.analytics.salesByCategory;
    },
    
    // Get revenue by time period
    getRevenueByPeriod: async () => {
      await delay(400);
      return mockData.analytics.revenueByPeriod;
    }
  }
};

export default apiService; 