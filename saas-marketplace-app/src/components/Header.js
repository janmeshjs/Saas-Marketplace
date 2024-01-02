import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SaaS Marketplace
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button><Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/Login">
          Login/ Signup
        </Button>
        <Button color="inherit" component={Link} to="/products"></Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
