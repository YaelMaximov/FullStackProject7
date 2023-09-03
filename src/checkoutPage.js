import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import enUS from 'date-fns/locale/en-US';



//import 'react-datepicker/dist/react-datepicker.css';
import './checkoutPage.css';

const CheckoutPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [value, setValue] = useState(new Date());

  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem('current'))?.name;

  const customLocale = {
    weekStartsOn: 0, // 0 for Sunday, 1 for Monday, etc.
  };

  // Add your logic and functions for handling date and time selection
  const handleSendOrder = async () => {
    try {
      const orederid = JSON.parse(localStorage.getItem('orderId'));
      const response = await fetch('http://localhost:3001/orders/close-order', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "orderId": orederid
        }),
      });
      const data = await response.json();
      localStorage.removeItem('orderId');
      const formattedDate = selectedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    alert(`your order has been forwarded for processing. \nThe delivery will arrive on ${formattedDate} at ${selectedTime}`);
    navigate(`/user/${username}`);
    setSelectedDate(new Date());
    setSelectedTime('');
    }
    catch (err) {
      console.error(err);
    }

  }

  return (
    <div className='checkoutPage_div'>
      <h1>Select a delivery date </h1>
      <Calendar calendarType='US' onChange={(date) => setSelectedDate(date)} /> 
      {/* <Calendar calendarType='Hebrew' onChange={(date) => setSelectedDate(date)} />  */}


      <select className='select_time' value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
        <option value="">Select the delivery arrival time</option>
        <option value="09:00">09:00</option>
        <option value="09:30">09:30</option>
        <option value="10:00">10:00</option>
        <option value="10:30">10:30</option>
        <option value="11:00">11:00</option>
        <option value="11:30">11:30</option>
        <option value="12:00">12:00</option>
        <option value="12:30">12:30</option>
        <option value="15:00">15:00</option>
        <option value="15:30">15:30</option>
        <option value="16:00">16:00</option>
        <option value="16:30">16:30</option>
        <option value="17:00">17:00</option>
        <option value="17:30">17:30</option>
      </select>
      <button className='confirm_button' onClick={handleSendOrder}>confirm </button>
    </div>
  );
};

export default CheckoutPage;