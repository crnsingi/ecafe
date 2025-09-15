import React, { useState, FormEvent } from 'react';
import '../App.css';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

interface ErrorResponse {
  message: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse | ErrorResponse = await response.json();

      if (response.ok && 'token' in data) {
        localStorage.setItem('token', data.token);
        console.log('Login successful', data);
        // Add navigation logic (e.g., useNavigate from react-router-dom)
      } else {
        setError('message' in data ? data.message : 'Login failed');
      }
    } catch (error) {
      setError('Network error occurred');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="app login-container">
      <div className="login-content">
        <h1>Log In</h1>
        <p>Access your account to manage orders and reservations.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Nº de Telefone</label>
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
          {error && <p className="error-message">{error}</p>}
        </form>
        <p>
          Don't have an account? <a href="#signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login