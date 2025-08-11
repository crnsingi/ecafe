import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const OnlineOrder: React.FC = () => {
  console.log("OnlineOrder rendered");

  const whatsappNumber = "244123456789";
  const whatsappText = "Hello! I would like to place an order.";

  return (
    <div className="online-order-container" style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Order Online</h1>
      <p style={{ marginBottom: '2rem' }}>Place your order via WhatsApp for quick and easy service.</p>

      {/* WhatsApp Order Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          backgroundColor: '#25D366',
          color: 'white',
          padding: '0.8rem 1.5rem',
          borderRadius: '5px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          marginBottom: '1.5rem'
        }}
      >
        📱 Order via WhatsApp
      </a>

      <p style={{ margin: '1.5rem 0', color: '#ffffff' }}>
        Or call us at: <a href={`tel:+${whatsappNumber}`} style={{ color: '#007bff' }}>+{whatsappNumber}</a>
      </p>

      <Link to="/menu" style={{ color: '#ffffff', textDecoration: 'underline' }}>
        ← Back to Menu
      </Link>
    </div>
  );
};

export default OnlineOrder;
