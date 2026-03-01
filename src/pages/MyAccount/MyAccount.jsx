import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useCart } from '../../context/CartContext';

import './MyAccount.scss';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showLogin, setShowLogin] = useState(true);

  const { cart, cartTotal } = useCart();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    setIsLoggedIn(true);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Simulate registration
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'My Account' }
  ];

  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    address: '123, Main Street, Chennai, Tamil Nadu - 600001'
  };

  // Mock orders
  const orders = [
    {
      id: 'ORD001',
      date: '2024-02-20',
      status: 'Delivered',
      total: 450,
      items: 3
    },
    {
      id: 'ORD002',
      date: '2024-02-15',
      status: 'Processing',
      total: 280,
      items: 2
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="my-account-page">
        <Breadcrumb items={breadcrumbItems} />

        <div className="auth-container">
          <div className="auth-card">
            {/* Auth Toggle */}
            <div className="auth-toggle">
              <button
                className={`toggle-btn ${showLogin ? 'active' : ''}`}
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button
                className={`toggle-btn ${!showLogin ? 'active' : ''}`}
                onClick={() => setShowLogin(false)}
              >
                Register
              </button>
            </div>

            {showLogin ? (
              /* Login Form */
              <form className="auth-form" onSubmit={handleLoginSubmit}>
                <h2>Welcome Back!</h2>
                <p className="auth-subtitle">Login to your account</p>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  Login
                </button>

                <p className="auth-switch">
                  Don't have an account?{' '}
                  <button type="button" onClick={() => setShowLogin(false)}>
                    Register
                  </button>
                </p>
              </form>
            ) : (
              /* Register Form */
              <form className="auth-form" onSubmit={handleRegisterSubmit}>
                <h2>Create Account</h2>
                <p className="auth-subtitle">Join Ayini Foods today</p>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>I agree to the Terms & Conditions</span>
                </label>

                <button type="submit" className="btn btn-primary btn-full">
                  Create Account
                </button>

                <p className="auth-switch">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setShowLogin(true)}>
                    Login
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-account-page">
      <Breadcrumb items={breadcrumbItems} />

      <div className="account-container">
        {/* Sidebar */}
        <aside className="account-sidebar">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
          </div>

          <nav className="account-nav">
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 My Profile
            </button>
            <button
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 My Orders
            </button>
            <button
              className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              📍 Addresses
            </button>
            <button
              className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              ❤️ Wishlist
            </button>
            <button className="nav-item logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="account-main">
          {activeTab === 'profile' && (
            <div className="account-section">
              <h2>My Profile</h2>
              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={userData.name} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={userData.email} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" defaultValue={userData.phone} />
                  </div>
                </div>
                <button className="btn btn-primary">Update Profile</button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="account-section">
              <h2>My Orders</h2>
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <span className="order-id">Order #{order.id}</span>
                        <span className={`order-status ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="order-details">
                        <p>Date: {order.date}</p>
                        <p>Items: {order.items}</p>
                        <p className="order-total">Total: ₹{order.total}</p>
                      </div>
                      <button className="btn btn-secondary btn-sm">View Details</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span>📦</span>
                  <p>No orders yet</p>
                  <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="account-section">
              <h2>Saved Addresses</h2>
              <div className="address-card">
                <div className="address-header">
                  <span className="address-type">Home</span>
                  <span className="default-badge">Default</span>
                </div>
                <p>{userData.address}</p>
                <p>{userData.phone}</p>
                <div className="address-actions">
                  <button className="btn btn-secondary btn-sm">Edit</button>
                  <button className="btn btn-secondary btn-sm">Delete</button>
                </div>
              </div>
              <button className="btn btn-primary">+ Add New Address</button>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="account-section">
              <h2>My Wishlist</h2>
              <div className="empty-state">
                <span>❤️</span>
                <p>Your wishlist is empty</p>
                <Link to="/products" className="btn btn-primary">Browse Products</Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyAccount;
