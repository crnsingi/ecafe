import React from 'react';
import '../App.css';
import image3 from '../assets/image3.jpg';

const Menu: React.FC = () => {
  console.log("Menu component rendered");
  return (
    <div className="app menu-container">
      <div className="menu-content">
        <h1>Menu</h1>
        <img src={image3} alt="Menu" className="menu-image" />
        <p>Explore our delicious offerings!</p>
      </div>
    </div>
  );
};

export default Menu;