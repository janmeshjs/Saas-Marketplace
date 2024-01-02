// frontend/saas-marketplace-app/src/components/Product.js
import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <Link to={`/products/${product._id}`}>Details</Link>
    </div>
  );
};

export default Product;
