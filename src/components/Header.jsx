import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
          <span className="logo-icon">🍲</span>
          <div className="logo-text">
            <span className="brand-name">Ayini Foods</span>
            <span className="brand-tagline">South Indian Delights</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${isActive('/')}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link
            to="/products"
            className={`nav-link ${isActive('/products')}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">🛒</span>
            <span>Products</span>
          </Link>
          <Link
            to="/my-account"
            className={`nav-link ${isActive('/my-account')}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">👤</span>
            <span>My Account</span>
          </Link>
        </nav>

        {/* Cart & Mobile Menu Toggle */}
        <div className="header-actions">
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛍️</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <span className="menu-icon">✕</span>
            ) : (
              <span className="menu-icon">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}
    </header>
  );
};

export default Header;
