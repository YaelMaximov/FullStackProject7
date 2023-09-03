import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Manager() {
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

  const handleManagerLogin = async () => {
    try {
      const response = await fetch(`http://localhost:3001/manager/login?email=${email}&password=${password}`);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('current', JSON.stringify(data));
        navigate(`/managerScreen/${data.name}`);
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

  return (
    <div className="manager-container">
      <label>
        <input
          className="manager-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label>
        <div className="manager-input-container">
          <input
            className="manager-input"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="show-password-button" type="button" onClick={toggleShowPassword}>
            {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
          </button>
        </div>
      </label>
      <button className="login-button" onClick={handleManagerLogin}>
        Login as Manager
      </button>
    </div>
  );
}

export default Manager;
