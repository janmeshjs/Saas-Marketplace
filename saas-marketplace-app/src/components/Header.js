import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import logo from '../Logos/M.png';
const Header = () => {
  return (
    <AppBar position="static"  sx={{ backgroundColor: '#55126a' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SaaS Marketplace
        </Typography>
        <img src={logo } alt ="LOGO"/>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/wishList">
          Wishlist
        </Button>
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Sign UP
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
