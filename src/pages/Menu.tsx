import React from 'react';
import '../App.css'; // Reuse App.css
import image3 from '../assets/image3.jpg'; // Adjust path if needed

const Menu = () => {
  console.log("Menu component rendered"); // Debug log
  return (
    <div className="app" style={{ 
      paddingTop: '78px', 
      backgroundColor: '#000000', 
      color: '#FFFFFF', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center' 
    }}>
      <div style={{ maxWidth: '800px', padding: '20px' }}>
        <h1>Menu</h1>
        <img src={image3} alt="Menu" style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }} />
        <p style={{ marginTop: '20px' }}>Explore our delicious offerings!</p>
      </div>
    </div>
  );
};

export default Menu;