import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import PersonalArea from './PersonalArea';

import './toolBar.css';

const Toolbar = ({ selectedCategory, handleCategoryClick, userName, userType, showCategories, setShowCategories, toggleCategories, onToggleAddProductForm}) => {
  const categories = [
    { name: 'fruits and vegetables', icon: 'fa-carrot', label: 'Fruits and Vegetables' },
    { name: 'Dairy', icon: 'fa-egg', label: 'Milk and Eggs' },
    { name: 'meat and fish', icon: 'fa-drumstick-bite', label: 'Meat and Fish' },
    { name: 'frozen', icon: 'fa-snowflake', label: 'Frozen' },
    { name: 'baking', icon: 'fa-bread-slice', label: 'Baking' },
    { name: 'legumes and grains', icon: 'fa-seedling', label: 'Legumes and Grains' },
    { name: 'sweets and drinks', icon: 'fa-candy-cane', label: 'Sweets and Drinks' },
  ];

  //const [showCategories, setShowCategories] = useState(window.innerWidth >= 1000);

  const handleAddProductClick = () => {
    onToggleAddProductForm(); // Call the function to toggle the Add Product form
  };

  const navigate = useNavigate();

  const handleCart = () => {
    navigate(`/user/${userName}/cartUser`);
  };

  const ShoppingCartIcon = () => {
    return (
      <div className="cart-icon">
        <button
          className="toolbar-button cart-icon"
          title={`Shopping Cart of ${userName}`}
          onClick={handleCart}
        >
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
    );
  };
  const handleLogout = () => {
    localStorage.removeItem('current');
    localStorage.removeItem('orderId');
    return <Navigate to="/login" />;
  };


  // Function to toggle the visibility of categories
  /*const toggleCategories = () => {
    setShowCategories((prevState) => !prevState);
  }*/

  useEffect(() => {
    const handleResize = () => {
      setShowCategories(window.innerWidth >= 1000);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="toolbar">
      <button className="toggle-categories-button" onClick={toggleCategories}>
          <i class="fa-solid fa-bars"></i>
        </button>
      {showCategories ? (
        <div className="categories-container">
          {categories.map((category) => (
            <Link
              to={`${category.name}`}
              key={category.name}
              className={`toolbar-button ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => {
                handleCategoryClick(category.name)
                setShowCategories(window.innerWidth >= 1000 && true)
              }}
            >
              <i className={`fas ${category.icon}`}></i>
              <span className="category-name">{category.label}</span>
            </Link>
          ))}
        </div>
      ) : (
        null
      )}
      {userType == 'manager' && (
        <button className="toolbar-button" onClick={handleAddProductClick}>
          <i className="fas fa-plus"></i>
          Add product
        </button>
      )}
       {userType != 'manager' && <Link  to="user_Area">user area</Link>}
       {userType != 'manager' && <ShoppingCartIcon/>}
      
      <Link className="toolbar-button" onClick={handleLogout} to="/login">
        Logout
      </Link>
    </div>
  );
  
};

export default Toolbar;
