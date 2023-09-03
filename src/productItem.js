import React, { useState } from 'react';

const ProductItem = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="product" key={product.product_id}>
      <img src={product.url} alt={product.product_name} />
      <p className="product-name">{product.product_name}</p>
      <p className="product-price">{product.price} ₪</p>
      <div className="quantity-select">
        <label htmlFor={`quantity-${product.product_id}`}>Quantity:</label>
        <select
          id={`quantity-${product.product_id}`}
          value={quantity}
          onChange={handleQuantityChange}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
