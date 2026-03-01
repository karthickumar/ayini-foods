import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  // WhatsApp Business Number (Replace with your actual number)
  const WHATSAPP_NUMBER = '+917338772008'; // Format: country code + number (no + or spaces)

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shopping Cart' }
  ];

  const deliveryCharge = cartTotal >= 499 ? 0 : 40;
  const finalTotal = cartTotal + deliveryCharge;

  // Generate WhatsApp message with order details
  const generateWhatsAppMessage = () => {
    let message = `🛒 *New Order from Ayini Foods*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `*Order Details:*\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += ` Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n`;
      message += ` Weight: ${item.weight}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Subtotal:* ₹${cartTotal}\n`;
    message += `*Delivery:* ${deliveryCharge === 0 ? 'FREE' : '₹' + deliveryCharge}\n`;
    message += `*Total Amount:* ₹${finalTotal}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Please confirm my order. 🙏`;

    return encodeURIComponent(message);
  };

  // Handle WhatsApp checkout
  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppMessage();
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <Breadcrumb items={breadcrumbItems} />
        <div className="empty-cart">
          <span className="empty-cart-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Breadcrumb items={breadcrumbItems} />

      <div className="cart-header">
        <h1>Shopping Cart ({cart.length} items)</h1>
        <button className="clear-cart-btn" onClick={clearCart}>
          🗑️ Clear Cart
        </button>
      </div>

      <div className="cart-container">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <p className="cart-item-weight">{item.weight}</p>
                <p className="cart-item-price">₹{item.price}</p>
              </div>

              <div className="cart-item-quantity">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                ₹{item.price * item.quantity}
              </div>

              <button
                className="remove-item-btn"
                onClick={() => removeFromCart(item.id)}
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal ({cart.length} items)</span>
            <span>₹{cartTotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Charges</span>
            <span className={deliveryCharge === 0 ? 'free' : ''}>
              {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
            </span>
          </div>

          {deliveryCharge > 0 && (
            <p className="free-delivery-msg">
              Add ₹{499 - cartTotal} more for FREE delivery!
            </p>
          )}

          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{finalTotal}</span>
          </div>

          <button
            className="checkout-btn btn btn-whatsapp"
            onClick={handleWhatsAppCheckout}
          >
            💬 Order via WhatsApp
          </button>

          <Link to="/products" className="continue-shopping">
            ← Continue Shopping
          </Link>

          {/* Promo Code */}
          <div className="promo-code-section">
            <h4>Have a promo code?</h4>
            <div className="promo-input">
              <input type="text" placeholder="Enter code" />
              <button className="btn btn-secondary">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
