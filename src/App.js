import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCatalog from './components/buyer/ProductCatalog';
import OrderForm from './components/buyer/OrderForm';
import OrderTracking from './components/buyer/OrderTracking';
import AdminPanel from './components/admin/AdminPanel';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import './App.css';

// Import Font Awesome for icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faShoppingCart, faTrashAlt, faPrint, faEdit, 
  faChevronDown, faChevronUp, faBox, faClipboardList, 
  faChartBar, faCog, faTruck, faTruckLoading, 
  faCheckCircle, faClipboardCheck, faMoon, faSun,
  faStar, faStarHalfAlt, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Add icons to library
library.add(
  fab, faShoppingCart, faTrashAlt, faPrint, faEdit,
  faChevronDown, faChevronUp, faBox, faClipboardList,
  faChartBar, faCog, faTruck, faTruckLoading,
  faCheckCircle, faClipboardCheck, faMoon, faSun,
  faStar, faStarHalfAlt, faTimes
);

// Main App component with AppProvider for global state
function App() {
  return (
    <AppProvider>
      <div className="app">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/tracking" element={<OrderTracking />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/about" element={<div>About Us Content</div>} />
            <Route path="/contact" element={<div>Contact Us Content</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
