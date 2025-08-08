import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './pages/Menu';
import OnlineOrder from './pages/OnlineOrder';
import Contact from './pages/Contact';
import Login from './pages/Login';
import './App.css';
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';

const App: React.FC = () => {
  console.log("App rendered");
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <section className="hero-images">
                <div className="image-container">
                  <img src={image1} alt="Hero Image 1" className="hero-image hero-image-1" />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Av.%20Hoji%20ya%20Henda%20132,%20Luanda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="find-us-button"
                  >
                    Find Us
                  </a>
                </div>
                <div className="image-container">
                  <img src={image2} alt="Hero Image 2" className="hero-image hero-image-2" />
                </div>
              </section>
            }
          />
          <Route path="/menu" element={<Menu />} />
          <Route path="/online-order" element={<OnlineOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;