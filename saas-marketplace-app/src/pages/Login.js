// frontend/saas-marketplace-app/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/users/login', { username, password });

      // Assuming the token is in the response body
      const token = response.data.token;

      // Store the token (you can use a more secure storage method)
      setToken(token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
