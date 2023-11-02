import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

const theme = createTheme();

const App = () => {
  const [token, setToken] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={<Login setToken={setToken} />}
            />
            <Route
              path="/dashboard"
              element={<PrivateRoute isAuthenticated={Boolean(token)} />}
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
