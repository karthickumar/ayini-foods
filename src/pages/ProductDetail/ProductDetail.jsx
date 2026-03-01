import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';

import './ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id])

  if (!product) {
    return (
      <div className="not-found-page">
        <div className="not-found-content">
          <span className="not-found-icon">🔍</span>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const cartItem = cart.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">★</span>);
      }
    }
    return stars;
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: product.categoryName, path: `/products?category=${product.category}` },
    { label: product.name }
  ];

  return (
    <div className="product-detail-page">
      <Breadcrumb items={breadcrumbItems} />

      <div className="product-detail-container">
        {/* Product Image */}
        <div className="product-detail-image">
          <div className="image-wrapper">
            {discount > 0 && (
              <span className="discount-badge">{discount}% OFF</span>
            )}
            {!product.inStock && (
              <span className="out-of-stock-badge">Out of Stock</span>
            )}
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          <span className="product-category-tag">{product.categoryName}</span>
          <h1 className="product-title">{product.name}</h1>

          {/* Rating */}
          <div className="product-rating">
            <div className="stars">{renderStars(product.rating)}</div>
            <span className="rating-value">{product.rating}</span>
            <span className="rating-count">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="product-price-section">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="original-price">₹{product.originalPrice}</span>
                <span className="savings">
                  You save ₹{product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          {/* Short Description */}
          <p className="product-short-desc">{product.description}</p>

          {/* Product Meta */}
          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Weight:</span>
              <span className="meta-value">{product.weight}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Availability:</span>
              <span className={`meta-value ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            {quantityInCart > 0 && (
              <div className="meta-item">
                <span className="meta-label">In Cart:</span>
                <span className="meta-value">{quantityInCart} item(s)</span>
              </div>
            )}
          </div>

          {/* Features */}
          {product.features && (
            <div className="product-features">
              {product.features.map((feature, index) => (
                <span key={index} className="feature-tag">✓ {feature}</span>
              ))}
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="product-actions">
            <div className="quantity-selector">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-controls">
                <button onClick={decrementQuantity} disabled={!product.inStock}>−</button>
                <span className="quantity-value">{quantity}</span>
                <button onClick={incrementQuantity} disabled={!product.inStock}>+</button>
              </div>
            </div>

            <button
              className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''} ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {addedToCart ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </button>
          </div>

          {/* Additional Actions */}
          <div className="additional-actions">
            <button className="action-btn">
              ❤️ Add to Wishlist
            </button>
            <button className="action-btn">
              📤 Share
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviews})
          </button>
          <button
            className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping Info
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === 'description' && (
            <div className="tab-panel">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              {product.features && (
                <>
                  <h4>Key Features:</h4>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-panel">
              <h3>Customer Reviews</h3>
              <div className="reviews-summary">
                <div className="rating-large">
                  <span className="rating-number">{product.rating}</span>
                  <div className="stars">{renderStars(product.rating)}</div>
                  <span className="review-count">Based on {product.reviews} reviews</span>
                </div>
              </div>
              <p className="no-reviews-msg">
                Be the first to write a detailed review for this product!
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="tab-panel">
              <h3>Shipping Information</h3>
              <ul>
                <li>Free delivery on orders above ₹499</li>
                <li>Standard delivery: 3-5 business days</li>
                <li>Express delivery available in select cities</li>
                <li>Cash on Delivery available</li>
              </ul>
              <h4>Return Policy</h4>
              <p>Easy returns within 7 days of delivery. Product must be unopened and in original packaging.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <h2>Related Products</h2>
          <div className="products-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
