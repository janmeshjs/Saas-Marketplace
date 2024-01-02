import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import '../App.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/register', {
        username,
        email,
        password,
      }); // Update with your backend URL
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    
      <div className="registerContainer">
     <Typography variant="h4" gutterBottom className="registerTitle">
        Register
      </Typography>
      <form className="registerForm">
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
