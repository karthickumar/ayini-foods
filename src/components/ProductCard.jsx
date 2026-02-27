import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        {/* Badges */}
        <div className="product-badges">
          {discount > 0 && (
            <span className="badge discount-badge">{discount}% OFF</span>
          )}
          {!product.inStock && (
            <span className="badge out-of-stock-badge">Out of Stock</span>
          )}
        </div>

        {/* Product Image */}
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          <div className="product-overlay">
            <span>View Details</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <span className="product-category">{product.categoryName}</span>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-weight">{product.weight}</p>

          {/* Rating */}
          <div className="product-rating">
            <div className="stars">{renderStars(product.rating)}</div>
            <span className="rating-value">{product.rating}</span>
            <span className="review-count">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="product-price">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
        onClick={handleAddToCart}
        disabled={!product.inStock}
      >
        {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default ProductCard;
