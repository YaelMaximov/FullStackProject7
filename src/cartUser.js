import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CheckoutPage from './checkoutPage';
import './cartUser.css';
import Toolbar from './toolBar';

const CartUser = () => {
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [isItemDeleted, setIsItemDeleted] = useState(false);

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('current'))?.user_id;
  const username = JSON.parse(localStorage.getItem('current'))?.name;

  useEffect(() => {
    fetchOrder(userId);
  }, [userId]);

  const fetchOrder = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/get-orders-of-user/${userId}`);
      const data = await response.json();
      if (data.length > 0) {
        setOrder(data[0]);
        fetchOrderItems(data[0].order_id);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const fetchOrderItems = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/orderItems/${orderId}`);
      const data = await response.json();
      setOrderItems(data);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  const handleDeleteItem = async (orderId, itemId, unitPrice,quantity) => {
    try {
      await fetch(`http://localhost:3001/orders/orderItems/${orderId}/${itemId}`, {
        method: 'DELETE',
      });

      // Remove the deleted item from the orderItems state
      setOrderItems(orderItems.filter((item) => item.order_item_id !== itemId));
      setIsItemDeleted(true);
      alert('The item has been deleted from the cart!');

      // Update the total amount of the order
      const updatedTotalAmount = order.total_amount - unitPrice*quantity;
      setOrder((prevOrder) => ({ ...prevOrder, total_amount: updatedTotalAmount }));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  

  const handleUpdateQuantity = async (order_id, order_item_id, newQuantity) => {
    
    const currentItem = orderItems.find((item) => item.order_item_id === order_item_id);
    const previousQuantity = currentItem.quantity;
    const priceItem = currentItem.unit_price;

    try {
      await fetch('http://localhost:3001/orders/update-quantity', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "orderItemId": order_item_id,
          "quantity": newQuantity
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Handle the response data accordingly
        })
        .catch((error) => {
          console.error('Error updating quantity:', error);
          // Handle the error case
        });
    }
    catch (error) {
      console.error('Error updating quantity:', error);

    }
    
    if (newQuantity === 0) {
      setOrderItems(orderItems.filter((item) => item.order_item_id !== order_item_id));
    } else {
      setOrderItems(orderItems.map((item) => {
        if (item.order_item_id === order_item_id) {
          return {
            ...item,
            quantity: newQuantity,
          };
          
        }
        return item;
      }));
    }

    const theChange = (newQuantity-previousQuantity)*priceItem;
    const total= parseFloat(order.total_amount) + parseFloat(theChange);
    setOrder ({
      ...order,
      total_amount: total,
    }
    );
    
  };

  const handleCheckOut = () => {
    navigate(`/user/${username}/checkOut`);
  }
  


  if (!order) {
      return (
      <div className='empty_cart'>
        <h2>Your cart is still empty</h2>
        <img
          src='https://cdn-icons-png.flaticon.com/512/669/669737.png?w=740&t=st=1688849310~exp=1688849910~hmac=ad5efedd58a9842cc8ef726c23b4006abe215b380048b996ce1de1ec2a1a4ddb'
          alt='empty cart' />
      </div>
      );
  }
  const { order_id, order_date, total_amount, status } = order;

  return (
    <div className="cart-page">
      {orderItems.length>0 &&
      <header>
        <h1> My Shopping Cart</h1>
      </header>}

      <div className="product-list">
        {orderItems && orderItems.length === 0 ? (
        <div className='empty_cart'>
          <h2>Your cart is still empty</h2>
        <img
          src='https://cdn-icons-png.flaticon.com/512/669/669737.png?w=740&t=st=1688849310~exp=1688849910~hmac=ad5efedd58a9842cc8ef726c23b4006abe215b380048b996ce1de1ec2a1a4ddb'
          alt='empty cart' />
        </div>
          
        ) : (
          orderItems &&
          orderItems.map((item) => (
            <div key={item.order_item_id} className="product-item">
              <img src={item.url} alt={item.product_name} className="product-image" />
              <div className="product-info">
                <p className="product-name">{item.product_name}</p>
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    onClick={() => handleUpdateQuantity(order_id, item.order_item_id, item.quantity - 1)}
                    disabled={item.quantity === 0}
                  >
                  -
                  </button>
                  <input
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(order_id, item.order_item_id, parseInt(e.target.value))}
                    className="quantity-input"
                  />
                  <button
                    className="quantity-button"
                    onClick={() => handleUpdateQuantity(order_id, item.order_item_id, item.quantity + 1)}
                  >
                  +
                  </button>
                </div>
              </div>
              <h3 className='unit_price'>{item.unit_price} ₪</h3>
              <button
                className="cart-delete-button"
                onClick={() => handleDeleteItem(order_id, item.order_item_id, item.unit_price,item.quantity)}
              >
                <i class="fas fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          ))
        )}
        {orderItems.length>0 &&
          <button className='button_to_pay' onClick={handleCheckOut}>Total Amount: {total_amount} ₪</button>}
      </div>
    </div>
  );
};

export default CartUser;
