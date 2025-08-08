import React from 'react';
import '../App.css';
import image3 from '../assets/image3.jpg';

const OnlineOrder: React.FC = () => {
  console.log("OnlineOrder component rendered");

  // Placeholder WhatsApp link (replace with your number in international format, e.g., +1234567890)
  const phoneNumber = "1234567890"; // Update this
  const preFilledMessage = encodeURIComponent("I'd like to place an order.");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${preFilledMessage}`;

  // Placeholder QR code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(whatsappLink)}`;

  return (
    <div className="app order-container">
      <div className="order-content">
        <h1>Online Ordering</h1>
        <img src={image3} alt="Online Order" className="order-image" />
        <p>Order your favorite dishes directly from our website or via WhatsApp!</p>
        <div className="order-features">
          <h2>Why Order With Us?</h2>
          <ul>
            <li><strong>Commission-Free:</strong> No hidden fees, keep more savings.</li>
            <li><strong>Seamless Integration:</strong> Orders sync directly with our kitchen.</li>
            <li><strong>Custom Branding:</strong> Enjoy a personalized ordering experience.</li>
            <li><strong>Real-Time Tracking:</strong> Track your order from placement to delivery.</li>
          </ul>
          <h2>Order via WhatsApp</h2>
          <p>Scan the QR code below to start a chat and place your order directly:</p>
          <img src={qrCodeUrl} alt="WhatsApp QR Code" className="whatsapp-qr-code" />
          <p>
            Or click <a href={whatsappLink} target="_blank" rel="noopener noreferrer">here</a> to chat now.
          </p>
          <a href="#order-now" className="order-now-button">Start Your Order</a>
        </div>
      </div>
    </div>
  );
};

export default OnlineOrder;