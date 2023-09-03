import React, { useState } from 'react';

import "./addProduct.css";


const AddProductForm = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    category: '',
    price: 0,
    url: '',
    inventory: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(newProduct);
    setNewProduct({
      product_name: '',
      category: '',
      price: 0,
      url: '',
      inventory: 0,
    });
  };


  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            name="product_name"
            value={newProduct.product_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Dairy">Dairy</option>
            <option value="meat and fish">Meat and Fish</option>
            <option value="fruits and vegetables">Fruits and Vegetables</option>
            <option value="frozen">Frozen</option>
            <option value="baking">Baking</option>
            <option value="legumes and grains">Legumes and Grains</option>
            <option value="sweets and drinks">Sweets and Drinks</option>
          </select>
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            name="url"
            value={newProduct.url}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Inventory:
          <input
            type="number"
            name="inventory"
            value={newProduct.inventory}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;