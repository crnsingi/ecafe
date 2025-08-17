import React from 'react';
import '../App.css';

const Contact: React.FC = () => {
  console.log("Contact component rendered"); // Debug log
  return (
    <div className="app contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>Address: Av. Hoji ya Henda 132, Luanda</p>
        <p>Email: example@domain.com</p>
        <p>Phone: +244 123 456 789</p>
      </div>
    </div>
  );
};

export default Contact;