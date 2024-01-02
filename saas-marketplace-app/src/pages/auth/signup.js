// frontend/saas-marketplace-app/src/pages/auth/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
//import '../../styles/auth.css'; // Import the CSS file for styling

axios.defaults.baseURL = 'http://localhost:3000';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/users/signup', { username, email, password });

      console.log('Signup successful:', response.data);
      // You may want to redirect to the login page or handle success in your UI
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    
    <div className="auth-container">
    <h2>Sign Up</h2>
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="button" onClick={handleSignup}>
        Sign Up
      </button>
    </form>
  </div>
  );
};

export default Signup;
