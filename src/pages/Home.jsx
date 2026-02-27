import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Home = () => {
  const featuredProducts = products.filter(p => p.rating >= 4.5).slice(0, 4);
  const newArrivals = products.slice(-4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Welcome to <span className="highlight">Ayini Foods</span>
          </h1>
          <p className="hero-subtitle">
            Authentic South Indian Flavors Delivered Fresh to Your Doorstep
          </p>
          <p className="hero-description">
            Discover our range of traditional ready mixes, crunchy snacks,
            homemade pickles, and aromatic spices.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              🛒 Shop Now
            </Link>
            <Link to="/products?category=ready-mix" className="btn btn-secondary">
              🥣 Ready Mix
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=400&fit=crop"
            alt="South Indian Food"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature">
          <span className="feature-icon">🚚</span>
          <h3>Free Delivery</h3>
          <p>On orders above ₹499</p>
        </div>
        <div className="feature">
          <span className="feature-icon">🌿</span>
          <h3>100% Fresh</h3>
          <p>No preservatives</p>
        </div>
        <div className="feature">
          <span className="feature-icon">⭐</span>
          <h3>Premium Quality</h3>
          <p>Best ingredients</p>
        </div>
        {/* <div className="feature">
          <span className="feature-icon">💬</span>
          <h3>24/7 Support</h3>
          <p>Always here to help</p>
        </div> */}
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <Link to="/products" className="view-all">View All →</Link>
        </div>
        <div className="categories-grid">
          {categories.filter(c => c.id !== 'all').map(category => (
            <Link
              to={`/products?category=${category.id}`}
              key={category.id}
              className="category-card"
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="section-header">
          <h2>⭐ Featured Products</h2>
          <Link to="/products" className="view-all">View All →</Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>🎉 Special Offer!</h2>
          <p>Get 20% off on your first order</p>
          <p className="promo-code">
            Use code: <strong>AYINI20</strong>
          </p>
          <Link to="/products" className="btn btn-light">
            Shop Now
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="products-section">
        <div className="section-header">
          <h2>🆕 New Arrivals</h2>
          <Link to="/products" className="view-all">View All →</Link>
        </div>
        <div className="products-grid">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <h2>Why Choose Ayini Foods?</h2>
        <div className="why-choose-grid">
          <div className="why-choose-item">
            <span className="icon">👨‍🍳</span>
            <h3>Traditional Recipes</h3>
            <p>Authentic recipes passed down through generations</p>
          </div>
          <div className="why-choose-item">
            <span className="icon">🏭</span>
            <h3>Hygienic Production</h3>
            <p>Made in clean, certified facilities</p>
          </div>
          <div className="why-choose-item">
            <span className="icon">📦</span>
            <h3>Secure Packaging</h3>
            <p>Products packed to retain freshness</p>
          </div>
          {/* <div className="why-choose-item">
            <span className="icon">🔄</span>
            <h3>Easy Returns</h3>
            <p>Not satisfied? Return within 7 days</p>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Home;
