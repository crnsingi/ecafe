import React, { useState, FormEvent } from 'react';
import '../App.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Login attempt', { email, password });
    // Add authentication logic here (e.g., Firebase, Auth0)
  };

  return (
    <div className="app login-container">
      <div className="login-content">
        <h1>Log In</h1>
        <p>Access your account to manage orders and reservations.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p>
          Don't have an account? <a href="#signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;