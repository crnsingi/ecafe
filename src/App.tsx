import Navbar from './components/Navbar';
import './App.css';
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';

const App = () => {
  return (
    <div className="app">
    <Navbar />
    <section className="hero-images">
      <div className="image-container">
        <img src={image1} alt="Hero Image 1" className="hero-image hero-image-1" />
        <a href="https://www.google.com/maps/search/?api=1&query=Av.%20Hoji%20ya%20Henda%20132,%20Luanda" target="_blank" rel="noopener noreferrer" className="find-us-button">
          Find Us
        </a>
      </div>
      <img src={image2} alt="Hero Image 2" className="hero-image" />
    </section>
  </div>
  );
};

export default App;