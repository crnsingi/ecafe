import './Navbar.css';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  return (
    <header className="header">
      <a href="/" className="logo">
        <img src={logo} alt="Location" className="logo-image" />
      </a>
      <nav className="navbar">
        <a href="https://www.google.com/maps/@-8.8300,13.2300,15z" target="_blank" rel="noopener noreferrer">Location</a>
        <a href="/menu" className="navbar-link">Menu</a>
        <a href="/">Online Order</a>
        <a href="/contact" className="navbar-link">Contact</a>
        <a href="/login" className="navbar-link">Log In</a>
      </nav>
    </header>
  );
};

export default Navbar;