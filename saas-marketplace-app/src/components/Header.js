// frontend/saas-marketplace-app/src/components/Header.js
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
        </Button>
        {/* Add more navigation buttons as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
