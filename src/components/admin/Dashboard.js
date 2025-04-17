import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faMoneyBillWave, 
  faUsers, 
  faBoxOpen,
  faCheckCircle,
  faSpinner,
  faTruck,
  faExclamationTriangle,
  faChartLine,
  faCalendarAlt,
  faArrowUp,
  faArrowDown,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  // Mock data for dashboard
  const stats = {
    orders: 234,
    revenue: '$12,345',
    customers: 86,
    products: 52,
  };

  const recentOrders = [
    { id: 'ORD-2023-5768', customer: 'John Smith', date: '2023-07-15', total: '$245.50', status: 'Delivered' },
    { id: 'ORD-2023-5767', customer: 'Sarah Johnson', date: '2023-07-15', total: '$187.25', status: 'Processing' },
    { id: 'ORD-2023-5766', customer: 'Michael Brown', date: '2023-07-14', total: '$345.00', status: 'Shipped' },
    { id: 'ORD-2023-5765', customer: 'Emily Davis', date: '2023-07-14', total: '$125.75', status: 'Cancelled' },
    { id: 'ORD-2023-5764', customer: 'Robert Wilson', date: '2023-07-13', total: '$427.60', status: 'Delivered' },
  ];

  const popularProducts = [
    { id: 1, name: 'Organic Apples', sales: 145, stock: 230 },
    { id: 2, name: 'Fresh Tomatoes', sales: 132, stock: 156 },
    { id: 3, name: 'Carrots (Bundle)', sales: 97, stock: 82 },
    { id: 4, name: 'Potatoes (5kg)', sales: 87, stock: 124 },
  ];

  // State for time period filter
  const [timePeriod, setTimePeriod] = useState('month');

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon delivered" />;
      case 'Processing':
        return <FontAwesomeIcon icon={faSpinner} className="status-icon processing" />;
      case 'Shipped':
        return <FontAwesomeIcon icon={faTruck} className="status-icon shipped" />;
      case 'Cancelled':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon cancelled" />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <div className="time-filter">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <select 
            value={timePeriod} 
            onChange={(e) => setTimePeriod(e.target.value)}
            className="time-select"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      
      <div className="analytics-cards">
        <div className="stat-card orders">
          <div className="stat-card-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <div className="stat-card-content">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.orders}</p>
            <div className="stat-trend">
              <p className="stat-change positive">
                <FontAwesomeIcon icon={faArrowUp} /> 12%
              </p>
              <p className="stat-period">from last {timePeriod}</p>
            </div>
          </div>
          <div className="stat-chart">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
        </div>
        
        <div className="stat-card revenue">
          <div className="stat-card-icon">
            <FontAwesomeIcon icon={faMoneyBillWave} />
          </div>
          <div className="stat-card-content">
            <h3>Total Revenue</h3>
            <p className="stat-value">{stats.revenue}</p>
            <div className="stat-trend">
              <p className="stat-change positive">
                <FontAwesomeIcon icon={faArrowUp} /> 8%
              </p>
              <p className="stat-period">from last {timePeriod}</p>
            </div>
          </div>
          <div className="stat-chart">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
        </div>
        
        <div className="stat-card customers">
          <div className="stat-card-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="stat-card-content">
            <h3>Total Customers</h3>
            <p className="stat-value">{stats.customers}</p>
            <div className="stat-trend">
              <p className="stat-change positive">
                <FontAwesomeIcon icon={faArrowUp} /> 5%
              </p>
              <p className="stat-period">from last {timePeriod}</p>
            </div>
          </div>
          <div className="stat-chart">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
        </div>
        
        <div className="stat-card products">
          <div className="stat-card-icon">
            <FontAwesomeIcon icon={faBoxOpen} />
          </div>
          <div className="stat-card-content">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.products}</p>
            <div className="stat-trend">
              <p className="stat-change negative">
                <FontAwesomeIcon icon={faArrowDown} /> 2%
              </p>
              <p className="stat-period">from last {timePeriod}</p>
            </div>
          </div>
          <div className="stat-chart">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="dashboard-section recent-orders">
          <div className="section-header">
            <h3>Recent Orders</h3>
            <div className="section-actions">
              <button className="view-all-btn">View All</button>
              <button className="options-btn">
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
            </div>
          </div>
          <div className="table-container">
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
                {recentOrders.map(order => (
                  <tr key={order.id} className={`order-row ${order.status.toLowerCase()}`}>
                    <td className="order-id">{order.id}</td>
                    <td className="customer-name">{order.customer}</td>
                    <td className="order-date">{order.date}</td>
                    <td className="order-amount">{order.total}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="dashboard-section popular-products">
          <div className="section-header">
            <h3>Popular Products</h3>
            <div className="section-actions">
              <button className="view-all-btn">View All</button>
              <button className="options-btn">
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
            </div>
          </div>
          <div className="popular-products-grid">
            {popularProducts.map(product => (
              <div className="popular-product-card" key={product.id}>
                <h4>{product.name}</h4>
                <div className="product-stats">
                  <div className="product-stat">
                    <span className="stat-label">Sales</span>
                    <span className="stat-value">{product.sales}</span>
                    <div className="stat-bar">
                      <div className="stat-bar-fill sales" style={{ width: `${(product.sales / 150) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="product-stat">
                    <span className="stat-label">In Stock</span>
                    <span className="stat-value">{product.stock}</span>
                    <div className="stat-bar">
                      <div className="stat-bar-fill stock" style={{ width: `${(product.stock / 250) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 