import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductItem from './productItem';
import './userScreen.css';


const Category = () => {
  const { id, category } = useParams();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orderId, setOrderId] = useState(() => localStorage.getItem('orderId') || '');

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  const fetchProducts = async (category) => {
    try {
      const response = await fetch(`http://localhost:3001/products/products?category=${category}`);
      const data = await response.json();
      setProducts(data);

      const response1 = await fetch(`http://localhost:3001/orders/orderItems/${orderId}`);
      const data1 = await response1.json();
      setCartItems(data1);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const addToCart = async (product, quantity) => {
    try {
      const userId = JSON.parse(localStorage.getItem('current'))?.user_id;
      if (!userId) {
        alert('User not found');
        return;
      }

      if (cartItems.length > 0) {
        const response = await fetch('http://localhost:3001/orders/orderItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            order_id: orderId, // Use the persisted orderId
            product_id: product.product_id,
            quantity: quantity,
            unit_price: product.price,
          }),
        });

        if (response.ok) {
          alert('Item added to cart!');
          setCartItems([...cartItems, {
            product_id: product.product_id,
            quantity: quantity,
            unit_price: product.price,
          }]);
        } else {
          alert('Failed to add item to cart');
        }
      } else {
        const newOrderResponse = await fetch(`http://localhost:3001/orders/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            order_date: new Date().toISOString().slice(0, 17).replace('T', ' '),
            total_amount: product.price * quantity,
            items: [
              {
                product_id: product.product_id,
                quantity: quantity,
                unit_price: product.price,
              },
            ],
          }),
        });

        if (newOrderResponse.ok) {
          const newOrderData = await newOrderResponse.json();
          const newOrderId = newOrderData.order_id;
          setOrderId(newOrderId);
          // Persist the new orderId in local storage
          localStorage.setItem('orderId', newOrderId);
          alert('Item added to cart!');
          setCartItems([{
            order_id: newOrderId,
            product_id: product.product_id,
            quantity: quantity,
            unit_price: product.price,
          }]);
        } else {
          alert('Failed to add item to cart');
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart');
    }
  };


  return (
      <div className="product-list">
        {products.map((product) => (
            <ProductItem key={product.product_id} product={product} addToCart={addToCart} />
        ))}
      </div>
    
  );
};


export default Category;
