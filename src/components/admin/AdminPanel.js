import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBoxes, 
  faUsers, 
  faChartLine, 
  faTruck, 
  faClipboardList,
  faWarehouse,
  faCog,
  faTachometerAlt,
  faArrowRight,
  faEnvelope,
  faBell,
  faSearch,
  faSignOutAlt,
  faCalendarAlt,
  faExchangeAlt,
  faPercentage,
  faShieldAlt,
  faUserCog
} from '@fortawesome/free-solid-svg-icons';
import ProductManagement from './ProductManagement';
import CustomerManagement from './CustomerManagement';
import InventoryManagement from './InventoryManagement';
import Dashboard from './Dashboard';
import OrderManagement from './OrderManagement';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for dashboard
  const dashboardData = {
    totalOrders: 142,
    pendingOrders: 18,
    totalCustomers: 64,
    totalRevenue: 12450.75,
    recentOrders: [
      { id: 'ORD-7842', customer: 'Michael Brown', date: '2023-04-10', total: 210.45, status: 'Delivered' },
      { id: 'ORD-7823', customer: 'John Smith', date: '2023-04-15', items: 5, total: 128.75, status: 'Processing' },
      { id: 'ORD-7801', customer: 'Sarah Johnson', date: '2023-03-28', items: 2, total: 65.90, status: 'Shipped' },
      { id: 'ORD-7791', customer: 'Emily Carter', date: '2023-04-05', items: 3, total: 95.20, status: 'Processing' }
    ],
    popularProducts: [
      { id: 101, name: 'Organic Apples', sales: 84, revenue: 252.00 },
      { id: 105, name: 'Fresh Carrots', sales: 76, revenue: 190.00 },
      { id: 110, name: 'Premium Oranges', sales: 65, revenue: 227.50 },
      { id: 120, name: 'Farm Fresh Tomatoes', sales: 62, revenue: 217.00 }
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 8245.50 },
      { month: 'Feb', revenue: 8750.25 },
      { month: 'Mar', revenue: 9120.75 },
      { month: 'Apr', revenue: 12450.75 }
    ],
    topCustomers: [
      { id: 201, name: 'Green Grocers LLC', orders: 12, spent: 2450.75 },
      { id: 205, name: 'Farm to Table Co.', orders: 9, spent: 1875.50 },
      { id: 208, name: 'Urban Market', orders: 7, spent: 1650.00 }
    ]
  };
  
  // Render dashboard content
  const renderDashboard = () => (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="header-actions">
          <div className="date-display">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faClipboardList} />
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-value">{dashboardData.totalOrders}</p>
            <p className="stat-info">
              <span className="highlight">{dashboardData.pendingOrders}</span> pending
            </p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="stat-content">
            <h3>Total Customers</h3>
            <p className="stat-value">{dashboardData.totalCustomers}</p>
            <p className="stat-info">
              <span className="highlight">+12%</span> this month
            </p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-value">${dashboardData.totalRevenue.toFixed(2)}</p>
            <p className="stat-info">
              <span className="highlight">+8%</span> vs last month
            </p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faBoxes} />
          </div>
          <div className="stat-content">
            <h3>Products In Stock</h3>
            <p className="stat-value">24</p>
            <p className="stat-info">
              <span className="highlight">5</span> low stock
            </p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-tables">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recent Orders</h3>
            <button className="view-all-btn" onClick={() => setActiveTab('orders')}>
              View All <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Popular Products</h3>
            <button className="view-all-btn" onClick={() => setActiveTab('products')}>
              View All <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sales</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.popularProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sales} units</td>
                  <td>${product.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  // Main render method
  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-header">
          <h3><FontAwesomeIcon icon={faShieldAlt} /> AgroFiX Admin</h3>
        </div>
        <nav className="admin-nav">
          <ul>
            <li 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span>Dashboard</span>
            </li>
            <li 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              <FontAwesomeIcon icon={faClipboardList} />
              <span>Orders</span>
            </li>
            <li 
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => setActiveTab('products')}
            >
              <FontAwesomeIcon icon={faBoxes} />
              <span>Products</span>
            </li>
            <li 
              className={activeTab === 'inventory' ? 'active' : ''}
              onClick={() => setActiveTab('inventory')}
            >
              <FontAwesomeIcon icon={faWarehouse} />
              <span>Inventory</span>
            </li>
            <li 
              className={activeTab === 'customers' ? 'active' : ''}
              onClick={() => setActiveTab('customers')}
            >
              <FontAwesomeIcon icon={faUsers} />
              <span>Customers</span>
            </li>
            <li 
              className={activeTab === 'shipping' ? 'active' : ''}
              onClick={() => setActiveTab('shipping')}
            >
              <FontAwesomeIcon icon={faTruck} />
              <span>Shipping</span>
            </li>
            <li 
              className={activeTab === 'marketing' ? 'active' : ''}
              onClick={() => setActiveTab('marketing')}
            >
              <FontAwesomeIcon icon={faPercentage} />
              <span>Marketing</span>
            </li>
            <li 
              className={activeTab === 'transactions' ? 'active' : ''}
              onClick={() => setActiveTab('transactions')}
            >
              <FontAwesomeIcon icon={faExchangeAlt} />
              <span>Transactions</span>
            </li>
            <li 
              className={activeTab === 'settings' ? 'active' : ''}
              onClick={() => setActiveTab('settings')}
            >
              <FontAwesomeIcon icon={faCog} />
              <span>Settings</span>
            </li>
          </ul>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <div className="user-avatar">
              <FontAwesomeIcon icon={faUserCog} />
            </div>
            <div className="user-info">
              <h4>Admin User</h4>
              <p>Super Admin</p>
            </div>
          </div>
          <button className="logout-btn">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="admin-content">
        <div className="admin-top-bar">
          <div className="admin-search">
            <FontAwesomeIcon icon={faSearch} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="admin-actions">
            <button className="action-btn">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="action-badge">3</span>
            </button>
            <button className="action-btn">
              <FontAwesomeIcon icon={faBell} />
              <span className="action-badge">{notifications}</span>
            </button>
          </div>
        </div>
        
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'inventory' && <InventoryManagement />}
        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'customers' && <CustomerManagement />}
        {activeTab === 'orders' && <OrderManagement />}
        
        {activeTab === 'shipping' && (
          <div className="admin-shipping">
            <div className="admin-page-header">
              <div>
                <h2>Shipping Management</h2>
                <p>Manage shipping methods, carriers, and delivery zones</p>
              </div>
            </div>
            <div className="coming-soon-container">
              <div className="coming-soon-icon">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <h3>Shipping Management Module</h3>
              <p>Our shipping management system is under development. Check back soon for updates.</p>
              <button className="btn-primary" onClick={() => setActiveTab('dashboard')}>
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'marketing' && (
          <div className="admin-marketing">
            <div className="admin-page-header">
              <div>
                <h2>Marketing Tools</h2>
                <p>Create and manage promotions, discounts, and marketing campaigns</p>
              </div>
            </div>
            <div className="coming-soon-container">
              <div className="coming-soon-icon">
                <FontAwesomeIcon icon={faPercentage} />
              </div>
              <h3>Marketing Module</h3>
              <p>The marketing management system is coming soon. Stay tuned for powerful promotional tools!</p>
              <button className="btn-primary" onClick={() => setActiveTab('dashboard')}>
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'transactions' && (
          <div className="admin-transactions">
            <div className="admin-page-header">
              <div>
                <h2>Transaction History</h2>
                <p>View and manage all financial transactions</p>
              </div>
            </div>
            <div className="coming-soon-container">
              <div className="coming-soon-icon">
                <FontAwesomeIcon icon={faExchangeAlt} />
              </div>
              <h3>Transactions Module</h3>
              <p>Our financial transactions tracking system will be available in the next update.</p>
              <button className="btn-primary" onClick={() => setActiveTab('dashboard')}>
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="admin-settings">
            <div className="admin-page-header">
              <div>
                <h2>System Settings</h2>
                <p>Configure application settings and preferences</p>
              </div>
            </div>
            <div className="coming-soon-container">
              <div className="coming-soon-icon">
                <FontAwesomeIcon icon={faCog} />
              </div>
              <h3>Settings Module</h3>
              <p>System configuration options will be available soon.</p>
              <button className="btn-primary" onClick={() => setActiveTab('dashboard')}>
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 