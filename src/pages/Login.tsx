import React, { useState, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import debounce from 'lodash.debounce'; // Install lodash for debouncing

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
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // For navigation after login

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Debounced email validation
  const debouncedValidateEmail = useCallback(
    debounce((value: string) => {
      if (value && !validateEmail(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError(null);
      }
    }, 500),
    []
  );

  // Password validation (e.g., minimum length)
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  // Debounced password validation
  const debouncedValidatePassword = useCallback(
    debounce((value: string) => {
      if (value && !validatePassword(value)) {
        setPasswordError('Password must be at least 6 characters');
      } else {
        setPasswordError(null);
      }
    }, 500),
    []
  );

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    debouncedValidateEmail(value);
  };

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    debouncedValidatePassword(value);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setApiError(null);

    // Validate before submitting
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

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
        navigate('/dashboard'); // Redirect to dashboard or desired route
      } else {
        setApiError('message' in data ? data.message : 'Login failed');
      }
    } catch (error) {
      setApiError('Network error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
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
              onChange={handleEmailChange}
              required
              placeholder="Enter your email"
              className={emailError ? 'input-error' : ''}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Enter your password"
              className={passwordError ? 'input-error' : ''}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="login-button"
            disabled={isLoading || !!emailError || !!passwordError}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
          {apiError && <p className="error-message">{apiError}</p>}
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;