// Product.js

import React, { useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(ShoppingCartContext);

  return (
    <div className="product-container">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={() => addToCart(product)} className="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
