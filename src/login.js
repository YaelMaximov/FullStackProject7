import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();

   const handleEmailChange = (event) => {
     setEmail(event.target.value);
   };

   const handlePasswordChange = (event) => {
     setPassword(event.target.value);
   };

   const toggleShowPassword = () => {
     setShowPassword((prevShowPassword) => !prevShowPassword);
   };

   const handleUserLogin = async () => {
     try {
       const response = await fetch(`http://localhost:3001/users/login?email=${email}&password=${password}`);
       const data = await response.json();

       if (response.ok) {
         localStorage.setItem('current', JSON.stringify(data));
         const getOrder = await fetch(`http://localhost:3001/orders/get-orders-of-user/${data.user_id}`);
         if(getOrder.ok) {
          const order = await getOrder.json();
          localStorage.setItem('orderId', order[0].order_id);
         }
         
         ///
         navigate(`/user/${data.name}`);
       } else {
         if (response.status === 401) {
           alert('Incorrect password');
         } else if (response.status === 404) {
           alert('User not found');
         } else {
           alert('Failed to log in');
         }
       }
     } catch (error) {
       console.error(error);
       alert('Failed to fetch login data');
     }
   };

   const handleManagerLogin = async () => {
     try {
       const response = await fetch(`http://localhost:3001/manager/login?email=${email}&password=${password}`);
       const data = await response.json();

       if (response.ok) {
         localStorage.setItem('current', JSON.stringify(data));
         navigate(`/manager/${data.name}`);
       } else {
         if (response.status === 401) {
           alert('Incorrect password');
         } else if (response.status === 404) {
           alert('Manager not found');
         } else {
           alert('Failed to log in');
         }
       }
     } catch (error) {
       console.error(error);
       alert('Failed to fetch login data');
     }
   };

   const handleCreateAccount = () => {
     navigate('/register');
   };

   return (
     <div className="login-container">
       <label>
         <input
           className="login-input"
           placeholder="Email"
           type="email"
           value={email}
           onChange={handleEmailChange}
         />
       </label>
       <label>
         <div className="login-input-container">
           <input
             className="login-input"
             placeholder="Password"
             type={showPassword ? 'text' : 'password'}
             value={password}
             onChange={handlePasswordChange}
           />
           <button className="show-password-button" type="button" onClick={toggleShowPassword}>
             {showPassword? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
           </button>
         </div>
       </label>
       <button className="login-button" onClick={handleUserLogin}>
         Login as User
       </button>
       <button className="login-button" onClick={handleManagerLogin}>
         Login as Manager
       </button>
       <label className="createAcc-label" onClick={handleCreateAccount}>
         Create an account
       </label>
     </div>
   );
}

export default Login;
