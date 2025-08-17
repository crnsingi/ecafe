import React from 'react';
import { Link } from 'react-router-dom';
import './OnlineOrder.css'; // Import the new CSS file

const OnlineOrder: React.FC = () => {
  console.log("OnlineOrder rendered");

  const whatsappNumber = "244123456789";
  const whatsappText = "Hello! I would like to place an order.";

  return (
    <div className="online-order-container">
      <h1 className="online-order-title">Order Online</h1>
      <p className="online-order-description">Place your order via WhatsApp for quick and easy service.</p>

      {/* WhatsApp Order Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        📱 Order via WhatsApp
      </a>

      <p className="call-info">
        Or call us at: <a href={`tel:+${whatsappNumber}`} className="call-link">+{whatsappNumber}</a>
      </p>

      <Link to="/menu" className="back-to-menu">
        ← Back to Menu
      </Link>
    </div>
  );
};

export default OnlineOrder;
