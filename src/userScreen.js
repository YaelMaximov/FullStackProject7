import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

import './userScreen.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Toolbar from './toolBar';
import ProductItem from './productItem';



const UserScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [showCategories, setShowCategories] = useState(window.innerWidth >= 1000);

  
  const userName = JSON.parse(localStorage.getItem('current'))?.name || '';
  const userType = JSON.parse(localStorage.getItem('current'))?.user_type || '';

  // Function to toggle the visibility of categories
  const toggleCategories = () => {
    setShowCategories((prevState) => !prevState);
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchProducts = async (category) => {
    try {
      const response = await fetch(`http://localhost:3001/products/products?category=${category}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('current'))?.user_id;
      if (!userId) {
        alert('User not found');
        return;
      }

      const savedOrderId = localStorage.getItem('orderId');
      if (savedOrderId) {
        setOrderId(savedOrderId);
      }

      const response = await fetch(`http://localhost:3001/orders/orderItems/${savedOrderId}`);
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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
            order_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
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
    <div className="user-screen">
      <Toolbar
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        userName={userName}
        userType={userType}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
        toggleCategories={toggleCategories}/>

      {(!showCategories || window.innerWidth >= 1000) &&
      <Outlet />}
    </div>
  );
};

export default UserScreen;
