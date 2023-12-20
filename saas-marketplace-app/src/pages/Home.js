// frontend/saas-marketplace-app/src/pages/Home.js
import React from 'react';
import ProductList from '../components/ProductList'; // Update the import path

const Home = () => {
  return (
    <div>
      <h2>Welcome to the SaaS Marketplace</h2>
      <ProductList />
    </div>
  );
};

export default Home;
