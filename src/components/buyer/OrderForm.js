import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrash, 
  faMinus, 
  faPlus, 
  faShoppingCart, 
  faUser, 
  faPhone, 
  faMapMarkerAlt, 
  faStickyNote,
  faCheck,
  faExclamationCircle,
  faTruck,
  faArrowRight,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';

const OrderForm = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateCartItemQuantity,
    setPage,
    calculateTotal,
    submitOrder
  } = useAppContext();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    contactInfo: '',
    address: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const validateForm = () => {
    const errors = {};
    
    if (!customerInfo.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!customerInfo.contactInfo.trim()) {
      errors.contactInfo = 'Contact information is required';
    } else if (!/^\d{10}$|^\d{3}-\d{3}-\d{4}$/.test(customerInfo.contactInfo.trim())) {
      errors.contactInfo = 'Please enter a valid phone number (e.g., 555-123-4567 or 5551234567)';
    }
    
    if (!customerInfo.address.trim()) {
      errors.address = 'Delivery address is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Use the submitOrder function from context
        const newOrderId = submitOrder(customerInfo);
        setOrderId(newOrderId);
        setOrderPlaced(true);
      } catch (error) {
        setFormErrors({
          ...formErrors,
          submission: 'An error occurred while placing your order. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
    
    // Clear the error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleTrackOrder = () => {
    setPage('tracking');
  };

  return (
    <div className="order-form-container">
      <div className="container">
        {orderPlaced ? (
          <div className="order-success">
            <div className="success-icon">
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your order. Your order has been received and is being processed.</p>
            <div className="order-details">
              <p><strong>Order ID:</strong> {orderId}</p>
              <p><strong>Name:</strong> {customerInfo.name}</p>
              <p><strong>Contact:</strong> {customerInfo.contactInfo}</p>
              <p><strong>Delivery Address:</strong> {customerInfo.address}</p>
              {customerInfo.notes && (
                <p><strong>Notes:</strong> {customerInfo.notes}</p>
              )}
            </div>
            <div className="action-buttons">
              <button 
                className="btn-primary"
                onClick={handleTrackOrder}
              >
                <FontAwesomeIcon icon={faTruck} /> Track Order
              </button>
              <button 
                className="btn-secondary"
                onClick={() => {
                  setPage('products');
                }}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="page-header">
              <h1>Your Cart</h1>
              <p>Review your items and complete your delivery information</p>
            </div>
            
            <div className="order-form">
              <div className="order-summary-container">
                <h3 className="section-title">
                  <FontAwesomeIcon icon={faShoppingCart} /> Shopping Cart
                </h3>
                {cartItems.length === 0 ? (
                  <div className="empty-cart">
                    <div className="empty-cart-icon">
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </div>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added any products to your cart yet.</p>
                    <button 
                      className="btn-primary"
                      onClick={() => setPage('products')}
                    >
                      <FontAwesomeIcon icon={faArrowRight} /> Browse Products
                    </button>
                  </div>
                ) : (
                  <div className="order-items">
                    <div className="cart-items-container">
                      {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                          <div className="cart-item-image" style={{ 
                            backgroundImage: `url(${item.imageUrl || item.image || `https://via.placeholder.com/100x100?text=${item.name}`})` 
                          }}></div>
                          <div className="cart-item-details">
                            <div className="cart-item-info">
                              <h4 className="cart-item-name">{item.name}</h4>
                              <p className="cart-item-price">${item.price.toFixed(2)} / {item.unit || 'unit'}</p>
                            </div>
                            <div className="cart-item-actions">
                              <div className="quantity-control">
                                <button 
                                  className="quantity-btn decrease"
                                  onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  aria-label="Decrease quantity"
                                  disabled={item.quantity <= 1}
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <input 
                                  type="number" 
                                  min="1" 
                                  value={item.quantity} 
                                  onChange={(e) => updateCartItemQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                                  className="quantity-input"
                                />
                                <button 
                                  className="quantity-btn increase"
                                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                  aria-label="Increase quantity"
                                >
                                  <FontAwesomeIcon icon={faPlus} />
                                </button>
                              </div>
                              <div className="cart-item-subtotal">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              <button 
                                className="remove-btn"
                                onClick={() => removeFromCart(item.id)}
                                aria-label="Remove item"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="cart-summary">
                      <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${calculateTotal()}</span>
                      </div>
                      <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="summary-divider"></div>
                      <div className="summary-row total">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </div>
                    
                    <div className="cart-actions">
                      <button className="continue-shopping" onClick={() => setPage('products')}>
                        <FontAwesomeIcon icon={faArrowRight} /> Continue Shopping
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="customer-form-container">
                  <h3 className="section-title">
                    <FontAwesomeIcon icon={faUser} /> Customer Information
                  </h3>
                  
                  {formErrors.submission && (
                    <div className="form-error-message">
                      <FontAwesomeIcon icon={faExclamationCircle} />
                      <span>{formErrors.submission}</span>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className={`form-group ${formErrors.name ? 'has-error' : ''}`}>
                      <label htmlFor="name">
                        <FontAwesomeIcon icon={faUser} /> Full Name*
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && (
                        <div className="error-message">
                          <FontAwesomeIcon icon={faExclamationCircle} /> {formErrors.name}
                        </div>
                      )}
                    </div>
                    
                    <div className={`form-group ${formErrors.contactInfo ? 'has-error' : ''}`}>
                      <label htmlFor="contactInfo">
                        <FontAwesomeIcon icon={faPhone} /> Contact Number*
                      </label>
                      <input 
                        type="text" 
                        id="contactInfo"
                        name="contactInfo"
                        value={customerInfo.contactInfo}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                      {formErrors.contactInfo && (
                        <div className="error-message">
                          <FontAwesomeIcon icon={faExclamationCircle} /> {formErrors.contactInfo}
                        </div>
                      )}
                    </div>
                    
                    <div className={`form-group ${formErrors.address ? 'has-error' : ''}`}>
                      <label htmlFor="address">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Delivery Address*
                      </label>
                      <textarea 
                        id="address"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete delivery address"
                      ></textarea>
                      {formErrors.address && (
                        <div className="error-message">
                          <FontAwesomeIcon icon={faExclamationCircle} /> {formErrors.address}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="notes">
                        <FontAwesomeIcon icon={faStickyNote} /> Additional Notes
                      </label>
                      <textarea 
                        id="notes"
                        name="notes"
                        value={customerInfo.notes}
                        onChange={handleInputChange}
                        placeholder="Any special instructions for delivery or order"
                      ></textarea>
                    </div>
                    
                    <div className="order-summary-card">
                      <div className="summary-header">
                        <FontAwesomeIcon icon={faClipboardList} />
                        <h4>Order Summary</h4>
                      </div>
                      <div className="summary-content">
                        <div className="summary-item">
                          <span>Items ({cartItems.length})</span>
                          <span>${calculateTotal()}</span>
                        </div>
                        <div className="summary-item">
                          <span>Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="summary-item total">
                          <span>Total</span>
                          <span>${calculateTotal()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="place-order-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner-sm"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faTruck} />
                          Place Order
                        </>
                      )}
                    </button>
                  </form>
                  
                  <style jsx>{`
                    .form-error-message {
                      background-color: rgba(244, 67, 54, 0.1);
                      border-left: 4px solid var(--error);
                      color: var(--error);
                      padding: 1rem;
                      margin-bottom: 1.5rem;
                      border-radius: var(--border-radius-md);
                      display: flex;
                      align-items: center;
                      gap: 0.75rem;
                    }
                    
                    .error-message {
                      display: flex;
                      align-items: center;
                      gap: 0.5rem;
                    }
                    
                    .order-summary-card {
                      background-color: var(--white);
                      border-radius: var(--border-radius-md);
                      border: 1px solid var(--gray-200);
                      margin: 2rem 0;
                      overflow: hidden;
                    }
                    
                    .summary-header {
                      background-color: var(--gray-50);
                      padding: 1rem 1.5rem;
                      border-bottom: 1px solid var(--gray-200);
                      display: flex;
                      align-items: center;
                      gap: 0.75rem;
                    }
                    
                    .summary-header h4 {
                      margin: 0;
                      font-size: 1.1rem;
                      color: var(--gray-800);
                    }
                    
                    .summary-content {
                      padding: 1.5rem;
                    }
                    
                    .summary-item {
                      display: flex;
                      justify-content: space-between;
                      margin-bottom: 1rem;
                    }
                    
                    .summary-item:last-child {
                      margin-bottom: 0;
                    }
                    
                    .summary-item.total {
                      font-weight: 700;
                      font-size: 1.2rem;
                      color: var(--gray-900);
                      border-top: 1px solid var(--gray-200);
                      padding-top: 1rem;
                      margin-top: 1rem;
                    }
                    
                    .place-order-btn {
                      width: 100%;
                      padding: 1rem 1.5rem;
                      background-color: var(--primary-color);
                      color: var(--white);
                      border: none;
                      border-radius: var(--border-radius-md);
                      font-weight: 600;
                      font-size: 1.1rem;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 0.75rem;
                      transition: all 0.3s ease;
                      box-shadow: 0 4px 10px rgba(76, 175, 80, 0.2);
                    }
                    
                    .place-order-btn:hover:not(:disabled) {
                      background-color: var(--primary-dark);
                      transform: translateY(-3px);
                      box-shadow: 0 6px 15px rgba(76, 175, 80, 0.3);
                    }
                    
                    .place-order-btn:disabled {
                      background-color: var(--gray-400);
                      cursor: not-allowed;
                      box-shadow: none;
                    }
                    
                    .spinner-sm {
                      width: 20px;
                      height: 20px;
                      border: 2px solid rgba(255, 255, 255, 0.3);
                      border-top-color: var(--white);
                      border-radius: 50%;
                      animation: spin 1s linear infinite;
                    }
                    
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                    
                    @media (max-width: 768px) {
                      .place-order-btn {
                        font-size: 1rem;
                        padding: 0.85rem 1.25rem;
                      }
                    }
                  `}</style>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderForm; 