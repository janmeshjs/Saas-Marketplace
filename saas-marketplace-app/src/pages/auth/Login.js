// frontend/saas-marketplace-app/src/pages/auth/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import '../../styles/auth.css'; // Import the CSS file for styling

axios.defaults.baseURL = 'http://localhost:3001';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/users/login', { username, password });

      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', token);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Incorrect username or password');
    }
    else {
      console.error('Login failed:', error);
    }
  }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default Login;
