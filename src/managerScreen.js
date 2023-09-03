import React, { useEffect, useState } from 'react';
import Toolbar from './toolBar';
import AddProductForm from './addProduct'; 

import "./managerScreen.css";

function ManagerScreen() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedPrice, setEditedPrice] = useState('');
  const [editedQuantity, setEditedQuantity] = useState('');
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const userName = JSON.parse(localStorage.getItem('current'))?.name || '';
  const userType = JSON.parse(localStorage.getItem('current'))?.user_type || '';
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showCategories, setShowCategories] = useState(window.innerWidth >= 1000);

  const toggleCategories = () => {
    setShowCategories((prevState) => !prevState);
  };

  const handleToggleAddProductForm = () => {
    setShowAddProductForm((prevShowForm) => !prevShowForm);
  };

  const handleAddProduct = async (newProduct) => {
    try {
      await fetch('http://localhost:3001/products/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      // After adding the new product, we can fetch the updated list of products
      fetchProducts(selectedCategory);
      alert('Product added successfully!');
      setShowAddProductForm(false);
      
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
    

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (category) => {
    try {
      const response = await fetch(`http://localhost:3001/products/products?category=${category}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleEditClick = (productId, currentPrice, currentQuantity) => {
    setEditingProduct(productId);
    setEditedPrice(currentPrice);
    setEditedQuantity(currentQuantity);
    setIsEditingPrice(false);
    setIsEditingQuantity(false);
  };

  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setEditedQuantity(e.target.value);
  };

  const handleSaveClick = async (productId) => {
    try {
      const productToUpdate = {};
      if (editedPrice !== '') {
        productToUpdate.price = parseFloat(editedPrice);
      }
      if (editedQuantity !== '') {
        productToUpdate.inventory = parseInt(editedQuantity);
      }

      await fetch(`http://localhost:3001/products/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToUpdate),
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.product_id === productId
            ? { ...product, ...productToUpdate }
            : product
        )
      );
      setEditingProduct(null);
      setEditedPrice('');
      setEditedQuantity('');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancelClick = () => {
    setEditingProduct(null);
    setEditedPrice('');
    setEditedQuantity('');
  };

  const handleDeleteClick = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
    try {
      await fetch(`http://localhost:3001/products/products/${productId}`, {
        method: 'DELETE',
      });
  
      // After deleting the product, we can fetch the updated list of products
      fetchProducts(selectedCategory);
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
  };
  

  return (
    <div className="user-screen">
      <Toolbar
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        userName={userName}
        userType={userType}
        onToggleAddProductForm={handleToggleAddProductForm}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
        toggleCategories={toggleCategories}
      />
      {showAddProductForm && (
        <AddProductForm onAddProduct={handleAddProduct} />
      )}
      <div className="product-list">
        {products.map((product) => (
          <div className="product" key={product.product_id}>
            <img src={product.url} alt={product.product_name} />
            <p className="product-name">{product.product_name}</p>
            <div className="product-price">
              {editingProduct === product.product_id ? (
                <>
                  <span className="product-subtitle">Price:</span>
                  {isEditingPrice ? (
                    <>
                      <input
                        className="product-price-input"
                        type="text"
                        value={editedPrice}
                        onChange={handlePriceChange}
                        required
                      />
                      <div className="product-button-group">
                        <button
                          className="product-button"
                          onClick={() => handleSaveClick(product.product_id)}
                        >
                          <i className="fa fa-check" aria-hidden="true"></i>
                        </button>
                        <button
                          className="product-button"
                          onClick={handleCancelClick}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="product-price-label">${product.price}</span>
                      <button
                        className="product-button"
                        onClick={() => {
                          setIsEditingPrice(true);
                          setIsEditingQuantity(false);
                        }}
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <span className="product-subtitle">Price:</span>
                  <span className="product-price-label">${product.price}</span>
                  <button
                    className="product-button"
                    onClick={() =>
                      handleEditClick(
                        product.product_id,
                        product.price,
                        product.inventory
                      )
                    }
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                </>
              )}
            </div>
            <div className="product-quantity">
              {editingProduct === product.product_id ? (
                <>
                  <span className="product-subtitle">Quantity:</span>
                  {isEditingQuantity ? (
                    <>
                      <input
                        className="product-quantity-input"
                        type="text"
                        value={editedQuantity}
                        onChange={handleQuantityChange}
                        required
                      />
                      <div className="product-button-group">
                        <button
                          className="product-button"
                          onClick={() => handleSaveClick(product.product_id)}
                        >
                          <i className="fa fa-check" aria-hidden="true"></i>
                        </button>
                        <button
                          className="product-button"
                          onClick={handleCancelClick}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="product-quantity-label">{product.inventory}</span>
                      <button
                        className="product-button"
                        onClick={() => {
                          setIsEditingQuantity(true);
                          setIsEditingPrice(false);
                        }}
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <span className="product-subtitle">Quantity:</span>
                  <span className="product-quantity-label">{product.inventory}</span>
                  <button
                    className="product-button"
                    onClick={() =>
                      handleEditClick(
                        product.product_id,
                        product.price,
                        product.inventory
                      )
                    }
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                </>
              )}
            </div>
            <button className="delete-button" onClick={() => handleDeleteClick(product.product_id)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
                  }  

export default ManagerScreen;
  