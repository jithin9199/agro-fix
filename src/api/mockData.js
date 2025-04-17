/**
 * Mock data for development and testing
 * This simulates API responses until the backend is connected
 */

// Products mock data
const products = [
  {
    id: 1,
    name: "Organic Apple Box",
    category: "Fruits",
    price: 34.99,
    stockQuantity: 50,
    description: "Premium organic apples in a convenient 10kg bulk box for families and businesses.",
    imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.5,
    featured: true,
    unit: "box (10kg)"
  },
  {
    id: 2,
    name: "Premium Carrot Tray",
    category: "Vegetables",
    price: 22.49,
    stockQuantity: 70,
    description: "Farm-fresh carrots in an 8kg tray, perfect for restaurants and catering services.",
    imageUrl: "https://images.unsplash.com/photo-1598170845041-d97a6cbef09b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.2,
    featured: true,
    unit: "tray (8kg)"
  },
  {
    id: 3,
    name: "Garden Vegetable Box",
    category: "Vegetables",
    price: 45.99,
    stockQuantity: 30,
    description: "Mixed seasonal vegetables in a 15kg box, ideal for weekly meal prep and commercial kitchens.",
    imageUrl: "https://images.unsplash.com/photo-1617693322136-d60689c23617?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.7,
    featured: true,
    unit: "box (15kg)"
  },
  {
    id: 4,
    name: "Organic Tomato Crate",
    category: "Organic",
    price: 30.99,
    stockQuantity: 40,
    description: "Organic vine-ripened tomatoes in a 10kg crate, grown without pesticides.",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.8,
    featured: true,
    unit: "crate (10kg)"
  },
  {
    id: 5,
    name: "Citrus Fruit Box",
    category: "Fruits",
    price: 39.99,
    stockQuantity: 35,
    description: "Mixed citrus box containing oranges, lemons, and limes. Great for juice bars and restaurants.",
    imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.6,
    featured: false,
    unit: "box (12kg)"
  },
  {
    id: 6,
    name: "Organic Salad Mix Tray",
    category: "Organic",
    price: 25.99,
    stockQuantity: 60,
    description: "Pre-washed organic mixed salad greens in a 5kg tray for food service businesses.",
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.3,
    featured: false,
    unit: "tray (5kg)"
  },
  {
    id: 7,
    name: "Bulk Potato Sack",
    category: "Vegetables",
    price: 27.99,
    stockQuantity: 85,
    description: "Premium potatoes in a 20kg sack, perfect for restaurants and caterers.",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.4,
    featured: false,
    unit: "sack (20kg)"
  },
  {
    id: 8,
    name: "Berry Medley Box",
    category: "Fruits",
    price: 52.50,
    stockQuantity: 25,
    description: "Assorted berries including strawberries, blueberries, and raspberries in a 5kg refrigerated box.",
    imageUrl: "https://images.unsplash.com/photo-1587394173925-09d479fe8129?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.9,
    featured: true,
    unit: "box (5kg)"
  },
  {
    id: 9,
    name: "Organic Vegetable Crate",
    category: "Organic",
    price: 49.75,
    stockQuantity: 20,
    description: "Seasonal organic vegetables in a 12kg crate, perfect for health-focused businesses.",
    imageUrl: "https://images.unsplash.com/photo-1543918075-e3b2cc0cad11?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.8,
    featured: true,
    unit: "crate (12kg)"
  },
  {
    id: 10,
    name: "Tropical Fruit Box",
    category: "Fruits",
    price: 65.99,
    stockQuantity: 15,
    description: "Exotic tropical fruits including mangoes, pineapples, and papayas in a 10kg box.",
    imageUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.6,
    featured: false,
    unit: "box (10kg)"
  },
  {
    id: 11,
    name: "Leafy Greens Bundle",
    category: "Vegetables",
    price: 29.99,
    stockQuantity: 40,
    description: "Fresh spinach, kale, and other leafy greens in a 7kg bundle for restaurants and smoothie shops.",
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.7,
    featured: true,
    unit: "bundle (7kg)"
  },
  {
    id: 12,
    name: "Organic Fruit Basket",
    category: "Organic",
    price: 45.50,
    stockQuantity: 30,
    description: "Assorted organic fruits in a 10kg basket, ideal for households and small businesses.",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.5,
    featured: false,
    unit: "basket (10kg)"
  }
];

// Categories mock data
const categories = [
  { id: 1, name: "Fruits", description: "Bulk boxes and crates of fresh seasonal fruits" },
  { id: 2, name: "Vegetables", description: "Bulk trays and sacks of farm-fresh vegetables" },
  { id: 3, name: "Organic", description: "Certified organic produce in bulk packages" }
];

// Orders mock data
const orders = [
  {
    id: 1,
    customerId: 1,
    items: [
      { productId: 1, quantity: 2, price: 29.99 },
      { productId: 3, quantity: 1, price: 34.99 }
    ],
    totalAmount: 94.97,
    status: "Delivered",
    orderDate: "2023-05-15T10:30:00",
    deliveryDate: "2023-05-18T14:20:00",
    shippingAddress: "123 Farm Road, Rural County",
    paymentMethod: "Credit Card"
  },
  {
    id: 2,
    customerId: 2,
    items: [
      { productId: 2, quantity: 1, price: 19.99 },
      { productId: 4, quantity: 5, price: 3.99 }
    ],
    totalAmount: 39.94,
    status: "In Progress",
    orderDate: "2023-06-02T09:15:00",
    deliveryDate: null,
    shippingAddress: "456 Harvest Lane, Cropville",
    paymentMethod: "PayPal"
  },
  {
    id: 3,
    customerId: 3,
    items: [
      { productId: 5, quantity: 1, price: 129.99 }
    ],
    totalAmount: 129.99,
    status: "Pending",
    orderDate: "2023-06-10T16:45:00",
    deliveryDate: null,
    shippingAddress: "789 Orchard Street, Gardentown",
    paymentMethod: "Bank Transfer"
  }
];

// Customers mock data
const customers = [
  {
    id: 1,
    name: "John Farmer",
    email: "john@farmexample.com",
    phone: "555-123-4567",
    address: "123 Farm Road, Rural County",
    registrationDate: "2023-01-10T08:30:00"
  },
  {
    id: 2,
    name: "Sarah Gardener",
    email: "sarah@gardenexample.com",
    phone: "555-234-5678",
    address: "456 Harvest Lane, Cropville",
    registrationDate: "2023-02-15T14:45:00"
  },
  {
    id: 3,
    name: "Michael Grower",
    email: "michael@growexample.com",
    phone: "555-345-6789",
    address: "789 Orchard Street, Gardentown",
    registrationDate: "2023-03-22T11:20:00"
  }
];

// Inventory transactions mock data
const inventoryTransactions = [
  {
    id: 1,
    productId: 1,
    type: "Receipt",
    quantity: 50,
    date: "2023-04-10T09:00:00",
    notes: "Initial stock"
  },
  {
    id: 2,
    productId: 1,
    type: "Sale",
    quantity: -10,
    date: "2023-04-15T13:30:00",
    notes: "Order #1245"
  },
  {
    id: 3,
    productId: 2,
    type: "Receipt",
    quantity: 30,
    date: "2023-04-12T10:15:00",
    notes: "Restocking"
  }
];

// Analytics mock data
const analytics = {
  summary: {
    totalSales: 12500.75,
    totalOrders: 145,
    averageOrderValue: 86.21,
    topSellingProduct: "Organic Fertilizer"
  },
  salesByCategory: [
    { category: "Fertilizers", amount: 4500.50, percentage: 36 },
    { category: "Seeds", amount: 2200.25, percentage: 17.6 },
    { category: "Tools", amount: 3100.00, percentage: 24.8 },
    { category: "Equipment", amount: 1800.75, percentage: 14.4 },
    { category: "Pesticides", amount: 900.25, percentage: 7.2 }
  ],
  revenueByPeriod: [
    { period: "Jan", amount: 950.25 },
    { period: "Feb", amount: 1050.50 },
    { period: "Mar", amount: 1200.75 },
    { period: "Apr", amount: 1300.00 },
    { period: "May", amount: 1500.25 },
    { period: "Jun", amount: 1700.50 }
  ]
};

// Export all mock data
module.exports = {
  products,
  categories,
  orders,
  customers,
  inventoryTransactions,
  analytics
}; 