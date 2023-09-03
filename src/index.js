import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './main';
import Login from './login';
import Register from './register';
import UserScreen from './userScreen';
import CartUser from './cartUser';
import Category from './Category';
import ManagerScreen from './managerScreen';
import CheckoutPage from './checkoutPage';
import PersonalArea from './PersonalArea';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/:id" element={<UserScreen />}>
        <Route path="/user/:id/:category" element={<Category />} />
        <Route path="/user/:id/user_Area" element={<PersonalArea />} />
        <Route path="/user/:id/cartUser" element={<CartUser />} />
        <Route path="/user/:id/checkOut" element={<CheckoutPage />} />
        
      </Route>
      <Route path="/manager/:id" element={<ManagerScreen />} >
        <Route path="/manager/:id/:category" element={<Category />} />
      </Route> 
    </Routes>
  </Router>
);

reportWebVitals();
