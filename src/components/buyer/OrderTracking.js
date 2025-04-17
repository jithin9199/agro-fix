import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClipboardCheck, 
  faTruckLoading, 
  faCheckCircle, 
  faPrint 
} from '@fortawesome/free-solid-svg-icons';

const OrderTracking = () => {
  const { 
    trackingId, 
    setTrackingId,
    trackedOrder,
    trackOrder,
    calculateTotal
  } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Check URL for tracking ID parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const orderIdParam = queryParams.get('orderId');
    
    if (orderIdParam) {
      setTrackingId(orderIdParam);
      handleTrackOrder(orderIdParam);
    }
  }, []);

  const handleTrackOrder = (id = null) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const result = trackOrder(id || trackingId);
      if (!result) {
        setErrorMessage('No order found with this ID. Please check and try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while tracking your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate progress percentage based on order status
  const calculateProgress = (status) => {
    switch (status) {
      case 'Pending':
        return 0;
      case 'In Progress':
        return 50;
      case 'Delivered':
        return 100;
      default:
        return 0;
    }
  };

  // Format date to be more human-readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="tracking" className="tracking-section">
      <div className="container">
        <div className="section-header">
          <h2>Track Your Order</h2>
          <p>Enter your order ID to check the status of your delivery</p>
        </div>
        
        <div className="order-form">
          <div className="tracking-form">
            <div className="form-group">
              <label htmlFor="orderId">Order ID</label>
              <div className="tracking-input-group">
                <input 
                  type="text" 
                  id="orderId" 
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="Enter your order ID"
                  className="tracking-input"
                />
                <button 
                  className="btn-primary"
                  onClick={() => handleTrackOrder()}
                  disabled={isLoading || !trackingId}
                >
                  {isLoading ? 'Tracking...' : 'Track'}
                </button>
              </div>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
          </div>

          {trackedOrder && (
            <div className="order-details">
              <div className="order-details-header">
                <h3>Order #{trackedOrder.id}</h3>
                <span className={`status-badge status-${trackedOrder.status.toLowerCase().replace(' ', '-')}`}>
                  {trackedOrder.status}
                </span>
              </div>
              
              <div className="order-info">
                <div className="order-info-item">
                  <span className="info-label">Date:</span>
                  <span className="info-value">{formatDate(trackedOrder.date)}</span>
                </div>
                <div className="order-info-item">
                  <span className="info-label">Customer:</span>
                  <span className="info-value">{trackedOrder.customerName}</span>
                </div>
                <div className="order-info-item">
                  <span className="info-label">Contact:</span>
                  <span className="info-value">{trackedOrder.contactInfo}</span>
                </div>
                <div className="order-info-item">
                  <span className="info-label">Delivery Address:</span>
                  <span className="info-value">{trackedOrder.deliveryAddress}</span>
                </div>
                {trackedOrder.notes && (
                  <div className="order-info-item">
                    <span className="info-label">Notes:</span>
                    <span className="info-value">{trackedOrder.notes}</span>
                  </div>
                )}
              </div>
              
              <div className="order-status-timeline">
                <div className="status-line">
                  <div 
                    className="status-line-progress" 
                    style={{ width: `${calculateProgress(trackedOrder.status)}%` }}
                  ></div>
                </div>
                
                <div className="status-steps">
                  <div className="status-step">
                    <div className={`status-circle ${trackedOrder.status ? 'active' : ''}`}>
                      <FontAwesomeIcon icon={faClipboardCheck} />
                    </div>
                    <div className="status-label">Pending</div>
                    <div className="status-description">Order received</div>
                  </div>
                  
                  <div className="status-step">
                    <div className={`status-circle ${trackedOrder.status === 'In Progress' || trackedOrder.status === 'Delivered' ? 'active' : ''}`}>
                      <FontAwesomeIcon icon={faTruckLoading} />
                    </div>
                    <div className="status-label">In Progress</div>
                    <div className="status-description">Order being processed</div>
                  </div>
                  
                  <div className="status-step">
                    <div className={`status-circle ${trackedOrder.status === 'Delivered' ? 'active' : ''}`}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className="status-label">Delivered</div>
                    <div className="status-description">Order successfully delivered</div>
                  </div>
                </div>
              </div>
              
              <div className="order-items-container">
                <h4>Ordered Items</h4>
                
                <div className="order-items">
                  <div className="order-item order-header">
                    <div className="item-name">Product</div>
                    <div className="item-price">Price</div>
                    <div className="item-quantity">Quantity</div>
                    <div className="item-total">Total</div>
                  </div>
                  
                  {trackedOrder.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">${item.price.toFixed(2)}/kg</div>
                      <div className="item-quantity">{item.quantity} kg</div>
                      <div className="item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  
                  <div className="order-summary">
                    <div className="order-total">
                      <span>Total:</span>
                      <span>${calculateTotal(trackedOrder.items)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="tracking-actions">
                <button 
                  className="btn-secondary print-btn"
                  onClick={() => window.print()}
                >
                  <FontAwesomeIcon icon={faPrint} /> Print Order Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderTracking; 