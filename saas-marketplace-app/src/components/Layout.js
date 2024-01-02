import React from 'react';
import Header from './Header';
import Container from '@mui/material/Container';
import '../App.css';
import Footer from './footer';
const Layout = ({ children }) => {
  return (
    <div className="layoutBackground">
      <Header />
      <Container>{children}</Container>
      <Footer/>
    </div>
    
  );
};

export default Layout;
