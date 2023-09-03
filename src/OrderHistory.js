import React, { useState, useEffect  } from 'react';


const OrderHistory = ({className, userId}) => {

  const [closedOrders, setClosedOrders] = useState([]);

  useEffect(() => {
    // Function to fetch closed orders for the current user
    const fetchClosedOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3001/orders/closed-orders-with-products?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch closed orders');
        }
        const data = await response.json();
        setClosedOrders(data.closedOrders);
      } catch (error) {
        console.error('Error fetching closed orders:', error);
      }
    };

    // Call the fetchClosedOrders function when the component mounts
    fetchClosedOrders();
  }, [userId]);

  return (
    <div className={className}>
      <h2>Order History</h2>
      
      {closedOrders.map((order) => (
        <div className='orederHistoryDiv' key={order.order_id}>
            <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
            <p><strong>Number of Items:</strong> {order.total_quantity}</p>
            <p><strong>Total Price:</strong> ₪{order.total_price}</p>
            <div className='imgDiv'>
                {(order.urls).map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Product ${index + 1}`} />
                ))}
            </div>
        </div>
        ))}
      
    </div>
  );
};

export default OrderHistory;
