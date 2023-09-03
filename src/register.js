import React, { useState } from 'react';
import {UserScreen} from './userScreen';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import './login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Register() {

    const [user, setUser] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    


    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSignUp = async () => {
      try {
        const response = await fetch('http://localhost:3001/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
    
        if (response.ok) {
          const data = await response.json();
          const { user_id } = data;
          localStorage.setItem('current', JSON.stringify(data));
          navigate(`/userScreen/${user.name}`);
          setUser({
            name: '',
            email: '',
            phone: '',
            address: '',
            password: '',
          });
        } else {
          console.error('Error creating user:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
    
    


    return (
     
        <div className="login-container signup">
            <label>
            <input className="login-input" placeholder="Full name" type="text" name="name" value={user.name} onChange={handleChange}  />
          </label>
          <label>
            <input className="login-input" placeholder="Email" type="text" name="email" value={user.email} onChange={handleChange}  />
          </label>
          <label>
            <input className="login-input" placeholder="Phone" type="text" name="phone" value={user.phone} onChange={handleChange}  />
          </label>
          <label>
            <input className="login-input" placeholder="Address" type="text" name="address" value={user.address} onChange={handleChange}  />
          </label>
          <label>
              <div className="login-input-container">
                <input className="login-input" placeholder="Password" type={showPassword ? 'text' : 'password'} name="password" value={user.password} onChange={handleChange} />
                <button className="show-password-button" type="button" onClick={toggleShowPassword}>
                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                </button>
              </div>
          </label>
          <button className="login-button" onClick={handleSignUp}>sign up</button>
        </div>
      );
    }


export default Register;