import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faSort,
  faSortUp,
  faSortDown,
  faFilter,
  faEye,
  faEnvelope,
  faPhone,
  faShoppingBasket,
  faMapMarkerAlt,
  faCalendarAlt,
  faUser,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const CustomerManagement = () => {
  // Mock data for customers
  const initialCustomers = [
    { 
      id: 1001, 
      name: 'John Smith', 
      email: 'john.smith@example.com', 
      phone: '555-123-4567', 
      location: 'New York, NY', 
      totalOrders: 12, 
      totalSpent: 842.50, 
      lastOrder: '2023-04-15',
      joinDate: '2022-01-10',
      status: 'Active'
    },
    { 
      id: 1002, 
      name: 'Sarah Johnson', 
      email: 'sarah.j@example.com', 
      phone: '555-987-6543', 
      location: 'Los Angeles, CA', 
      totalOrders: 8, 
      totalSpent: 643.20, 
      lastOrder: '2023-03-28',
      joinDate: '2022-02-14',
      status: 'Active'
    },
    { 
      id: 1003, 
      name: 'Michael Brown', 
      email: 'mbrown@example.com', 
      phone: '555-456-7890', 
      location: 'Chicago, IL', 
      totalOrders: 15, 
      totalSpent: 1250.75, 
      lastOrder: '2023-04-10',
      joinDate: '2021-11-05',
      status: 'Active'
    },
    { 
      id: 1004, 
      name: 'Emily Davis', 
      email: 'emily.davis@example.com', 
      phone: '555-789-1234', 
      location: 'Houston, TX', 
      totalOrders: 3, 
      totalSpent: 188.40, 
      lastOrder: '2023-02-20',
      joinDate: '2023-01-22',
      status: 'Active'
    },
    { 
      id: 1005, 
      name: 'Robert Wilson', 
      email: 'rwilson@example.com', 
      phone: '555-321-7654', 
      location: 'Miami, FL', 
      totalOrders: 10, 
      totalSpent: 915.30, 
      lastOrder: '2023-04-05',
      joinDate: '2022-05-30',
      status: 'Active'
    },
    { 
      id: 1006, 
      name: 'Lisa Anderson', 
      email: 'lisa.a@example.com', 
      phone: '555-654-3210', 
      location: 'Seattle, WA', 
      totalOrders: 6, 
      totalSpent: 429.85, 
      lastOrder: '2023-03-12',
      joinDate: '2022-09-18',
      status: 'Inactive'
    },
    { 
      id: 1007, 
      name: 'James Martinez', 
      email: 'jmartinez@example.com', 
      phone: '555-147-2583', 
      location: 'Denver, CO', 
      totalOrders: 9, 
      totalSpent: 782.40, 
      lastOrder: '2023-01-28',
      joinDate: '2022-04-11',
      status: 'Active'
    },
    { 
      id: 1008, 
      name: 'Jennifer Taylor', 
      email: 'jtaylor@example.com', 
      phone: '555-369-8520', 
      location: 'Austin, TX', 
      totalOrders: 4, 
      totalSpent: 291.25, 
      lastOrder: '2023-02-10',
      joinDate: '2022-11-29',
      status: 'Inactive'
    }
  ];

  // Mock data for customer orders
  const customerOrders = {
    1001: [
      { id: 'ORD-7823', date: '2023-04-15', items: 5, total: 128.75, status: 'Delivered' },
      { id: 'ORD-6954', date: '2023-03-22', items: 3, total: 87.50, status: 'Delivered' },
      { id: 'ORD-5432', date: '2023-02-18', items: 4, total: 104.25, status: 'Delivered' }
    ],
    1002: [
      { id: 'ORD-7801', date: '2023-03-28', items: 2, total: 65.90, status: 'Delivered' },
      { id: 'ORD-6723', date: '2023-02-14', items: 6, total: 143.80, status: 'Delivered' }
    ],
    1003: [
      { id: 'ORD-7842', date: '2023-04-10', items: 8, total: 210.45, status: 'Delivered' },
      { id: 'ORD-7591', date: '2023-03-17', items: 3, total: 76.30, status: 'Delivered' },
      { id: 'ORD-7102', date: '2023-02-28', items: 5, total: 124.50, status: 'Delivered' }
    ]
  };

  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  // Handle sorting
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sorted and filtered customers
  const getFilteredCustomers = () => {
    let filtered = [...customers];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus) {
      filtered = filtered.filter(customer => customer.status === filterStatus);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
    });
    
    return filtered;
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (field !== sortField) return <FontAwesomeIcon icon={faSort} />;
    return sortDirection === 'asc' 
      ? <FontAwesomeIcon icon={faSortUp} /> 
      : <FontAwesomeIcon icon={faSortDown} />;
  };

  // View customer details
  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailVisible(true);
  };

  // Close customer details
  const handleCloseDetails = () => {
    setIsDetailVisible(false);
    setSelectedCustomer(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="customer-management">
      <div className="section-header">
        <h2>Customer Management</h2>
      </div>

      {/* Customer Details */}
      {isDetailVisible && selectedCustomer && (
        <div className="customer-detail-container">
          <div className="customer-detail">
            <div className="detail-header">
              <h3>
                <FontAwesomeIcon icon={faUser} /> Customer Details
              </h3>
              <button className="close-btn" onClick={handleCloseDetails}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="detail-content">
              <div className="detail-section basic-info">
                <h4>Basic Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Customer ID:</span>
                    <span className="info-value">{selectedCustomer.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{selectedCustomer.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <FontAwesomeIcon icon={faEnvelope} /> Email:
                    </span>
                    <span className="info-value">
                      <a href={`mailto:${selectedCustomer.email}`}>{selectedCustomer.email}</a>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <FontAwesomeIcon icon={faPhone} /> Phone:
                    </span>
                    <span className="info-value">
                      <a href={`tel:${selectedCustomer.phone}`}>{selectedCustomer.phone}</a>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> Location:
                    </span>
                    <span className="info-value">{selectedCustomer.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <FontAwesomeIcon icon={faCalendarAlt} /> Joined:
                    </span>
                    <span className="info-value">{formatDate(selectedCustomer.joinDate)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span className={`status-badge ${selectedCustomer.status.toLowerCase()}`}>
                      {selectedCustomer.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section purchase-info">
                <h4>Purchase Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">
                      <FontAwesomeIcon icon={faShoppingBasket} /> Total Orders:
                    </span>
                    <span className="info-value">{selectedCustomer.totalOrders}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Total Spent:</span>
                    <span className="info-value">${selectedCustomer.totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Order:</span>
                    <span className="info-value">{formatDate(selectedCustomer.lastOrder)}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section recent-orders">
                <h4>Recent Orders</h4>
                {customerOrders[selectedCustomer.id] ? (
                  <table className="data-table orders-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerOrders[selectedCustomer.id].map(order => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{formatDate(order.date)}</td>
                          <td>{order.items}</td>
                          <td>${order.total.toFixed(2)}</td>
                          <td><span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="no-orders">No recent orders found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="filters-container">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-options">
          <div className="filter-group">
            <label>
              <FontAwesomeIcon icon={faFilter} /> Status:
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="table-container">
        <table className="data-table customers-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>
                ID {getSortIcon('id')}
              </th>
              <th onClick={() => handleSort('name')}>
                Name {getSortIcon('name')}
              </th>
              <th onClick={() => handleSort('email')}>
                Email {getSortIcon('email')}
              </th>
              <th onClick={() => handleSort('location')}>
                Location {getSortIcon('location')}
              </th>
              <th onClick={() => handleSort('totalOrders')}>
                Orders {getSortIcon('totalOrders')}
              </th>
              <th onClick={() => handleSort('totalSpent')}>
                Total Spent {getSortIcon('totalSpent')}
              </th>
              <th onClick={() => handleSort('lastOrder')}>
                Last Order {getSortIcon('lastOrder')}
              </th>
              <th onClick={() => handleSort('status')}>
                Status {getSortIcon('status')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredCustomers().map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>
                  <a href={`mailto:${customer.email}`} className="email-link">
                    {customer.email}
                  </a>
                </td>
                <td>{customer.location}</td>
                <td>{customer.totalOrders}</td>
                <td>${customer.totalSpent.toFixed(2)}</td>
                <td>{formatDate(customer.lastOrder)}</td>
                <td>
                  <span className={`status-badge ${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-btn view-btn" 
                    onClick={() => handleViewDetails(customer)}
                    title="View Customer Details"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {getFilteredCustomers().length === 0 && (
          <div className="empty-state">
            <p>No customers found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement; 