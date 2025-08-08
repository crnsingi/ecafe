import React from 'react';
import '../App.css'; // Adjust path if needed

const OnlineOrder: React.FC = () => {
  console.log("OnlineOrder rendered");
  return (
    <div className="app online-order-container">
      <h1>Order Online</h1>
      <p>Place your order via WhatsApp for quick and easy service.</p>
      <a
        href="https://wa.me/244123456789?text=Hello!%20I%20would%20like%20to%20place%20an%20order."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        Order via WhatsApp
      </a>
      <p>Or call us at: +244 123 456 789</p>
    </div>
  );
};

export default OnlineOrder;