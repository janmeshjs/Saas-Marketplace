import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import ProductList from './components/ProductList';
import Footer from './components/footer';

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
             <Route path="/products" element={<ProductList />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute isAuthenticated={Boolean(token)} />}
            />
          <Route path="/footer" element={<Footer />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
