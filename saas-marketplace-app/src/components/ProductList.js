import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products'); // Update with your backend URL
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <List>
        {products.map((product) => (
          <ListItem key={product._id}>
            <ListItemText primary={product.name} secondary={product.description} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ProductList;
