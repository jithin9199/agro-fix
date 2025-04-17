import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faSort, 
  faFilter, 
  faTimes,
  faEye,
  faTruck,
  faCheckCircle,
  faClock
} from '@fortawesome/free-solid-svg-icons';

const OrderManagement = () => {
  // Mock orders data - in a real app, this would come from context/API
  const [orders, setOrders] = useState([
    { 
      id: 'ORD-7842', 
      customer: 'Michael Brown', 
      email: 'michael.brown@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Anytown, CA 94321',
      date: '2023-04-10', 
      total: 210.45, 
      status: 'Delivered',
      items: [
        { id: 1, name: 'Organic Apples', price: 3.99, quantity: 5 },
        { id: 2, name: 'Fresh Carrots', price: 2.49, quantity: 3 },
        { id: 3, name: 'Premium Oranges', price: 4.25, quantity: 4 }
      ]
    },
    { 
      id: 'ORD-7823', 
      customer: 'John Smith', 
      email: 'john.smith@example.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Springfield, IL 62704',
      date: '2023-04-15', 
      total: 128.75, 
      status: 'In Progress',
      items: [
        { id: 4, name: 'Red Apples', price: 2.99, quantity: 3 },
        { id: 5, name: 'Fresh Tomatoes', price: 3.50, quantity: 2 },
        { id: 6, name: 'Organic Spinach', price: 4.99, quantity: 1 }
      ]
    },
    { 
      id: 'ORD-7801', 
      customer: 'Sarah Johnson', 
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 765-4321',
      address: '789 Pine St, Lakeside, WA 98001',
      date: '2023-03-28', 
      total: 65.90, 
      status: 'Pending',
      items: [
        { id: 7, name: 'Bananas', price: 1.99, quantity: 2 },
        { id: 8, name: 'Broccoli', price: 2.99, quantity: 1 }
      ]
    },
    { 
      id: 'ORD-7791', 
      customer: 'Emily Carter', 
      email: 'emily.carter@example.com',
      phone: '+1 (555) 234-5678',
      address: '101 Cedar Rd, Mountainview, CO 80301',
      date: '2023-04-05', 
      total: 95.20, 
      status: 'Pending',
      items: [
        { id: 9, name: 'Organic Strawberries', price: 5.99, quantity: 2 },
        { id: 10, name: 'Zucchini', price: 2.49, quantity: 3 }
      ]
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('date-desc');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      // Filter by search term
      if (searchTerm && !order.customer.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !order.id.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filter by status
      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected order
      switch (sortOrder) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'total-asc':
          return a.total - b.total;
        case 'total-desc':
          return b.total - a.total;
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
  
  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };
  
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };
  
  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'Pending':
        return 'In Progress';
      case 'In Progress':
        return 'Delivered';
      default:
        return currentStatus;
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FontAwesomeIcon icon={faClock} />;
      case 'In Progress':
        return <FontAwesomeIcon icon={faTruck} />;
      case 'Delivered':
        return <FontAwesomeIcon icon={faCheckCircle} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="order-management">
      <div className="admin-section-header">
        <h2>Order Management</h2>
        <p>View and manage customer orders</p>
      </div>
      
      <div className="admin-controls">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search by customer name or order ID..."
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
            <label htmlFor="status-filter">
              <FontAwesomeIcon icon={faFilter} /> Status:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
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
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="total-desc">Total (High to Low)</option>
              <option value="total-asc">Total (Low to High)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="orders-summary">
        <span className="orders-count">
          {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
        </span>
        
        {statusFilter !== 'all' && (
          <span className="filter-badge">
            Status: {statusFilter}
            <button 
              className="clear-filter" 
              onClick={() => setStatusFilter('all')}
              aria-label="Clear filter"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </span>
        )}
      </div>
      
      <div className="orders-table">
        <div className="order-row header">
          <div className="order-cell order-id">Order ID</div>
          <div className="order-cell customer">Customer</div>
          <div className="order-cell date">Date</div>
          <div className="order-cell total">Total</div>
          <div className="order-cell status">Status</div>
          <div className="order-cell actions">Actions</div>
        </div>
        
        {filteredOrders.map(order => (
          <React.Fragment key={order.id}>
            <div className="order-row">
              <div className="order-cell order-id">{order.id}</div>
              <div className="order-cell customer">{order.customer}</div>
              <div className="order-cell date">{new Date(order.date).toLocaleDateString()}</div>
              <div className="order-cell total">${order.total.toFixed(2)}</div>
              <div className="order-cell status">
                <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                  {getStatusIcon(order.status)} {order.status}
                </span>
              </div>
              <div className="order-cell actions">
                <button 
                  className="action-btn view-btn" 
                  onClick={() => toggleOrderDetails(order.id)}
                  title="View Details"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>
            
            {expandedOrderId === order.id && (
              <div className="order-details-row" style={{ maxHeight: '1000px' }}>
                <div className="order-details-content">
                  <div className="order-details-section">
                    <h4>Customer Information</h4>
                    <div className="details-grid">
                      <div className="details-item">
                        <div className="details-label">Name</div>
                        <div className="details-value">{order.customer}</div>
                      </div>
                      <div className="details-item">
                        <div className="details-label">Email</div>
                        <div className="details-value">{order.email}</div>
                      </div>
                      <div className="details-item">
                        <div className="details-label">Phone</div>
                        <div className="details-value">{order.phone}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="order-details-section">
                    <h4>Delivery Address</h4>
                    <div className="details-value">{order.address}</div>
                  </div>
                  
                  <div className="order-details-section">
                    <h4>Order Items</h4>
                    <div className="order-items-table">
                      <div className="item-row header">
                        <div>Product</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Total</div>
                      </div>
                      
                      {order.items.map(item => (
                        <div className="item-row" key={item.id}>
                          <div>{item.name}</div>
                          <div>${item.price.toFixed(2)}</div>
                          <div>{item.quantity}</div>
                          <div>${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                      
                      <div className="item-row total-row">
                        <div className="item-cell total-label">Order Total:</div>
                        <div className="item-cell total-value">${order.total.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="order-details-section">
                    <h4>Order Status</h4>
                    <div className="status-timeline">
                      <div className="status-step">
                        <div className={`status-circle ${order.status === 'Pending' || order.status === 'In Progress' || order.status === 'Delivered' ? 'active' : ''}`}>
                          <FontAwesomeIcon icon={faClock} />
                        </div>
                        <div className="status-label">Pending</div>
                      </div>
                      <div className="status-line">
                        <div className={`status-line-progress ${order.status === 'In Progress' || order.status === 'Delivered' ? 'active' : ''}`}></div>
                      </div>
                      <div className="status-step">
                        <div className={`status-circle ${order.status === 'In Progress' || order.status === 'Delivered' ? 'active' : ''}`}>
                          <FontAwesomeIcon icon={faTruck} />
                        </div>
                        <div className="status-label">In Progress</div>
                      </div>
                      <div className="status-line">
                        <div className={`status-line-progress ${order.status === 'Delivered' ? 'active' : ''}`}></div>
                      </div>
                      <div className="status-step">
                        <div className={`status-circle ${order.status === 'Delivered' ? 'active' : ''}`}>
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div className="status-label">Delivered</div>
                      </div>
                    </div>
                    
                    <div className="status-actions">
                      {order.status !== 'Delivered' && (
                        <button 
                          className="btn-primary status-update-btn"
                          onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                        >
                          Update to {getNextStatus(order.status)}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement; 