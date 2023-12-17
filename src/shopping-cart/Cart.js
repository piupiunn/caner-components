// Cart.js

import React, { useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(ShoppingCartContext);

  // Aynı üründen toplam adedi hesaplamak için bir yardımcı fonksiyon
  const countTotalQuantity = (itemId) => {
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      if (item.id === itemId) {
        totalQuantity += item.quantity;
      }
    });
    return totalQuantity;
  };

  // Aynı üründen sadece bir kez görüntülemek için kullanılan bir Set
  const uniqueItems = [...new Set(cartItems.map((item) => item.id))];

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p> // Sepet boşsa gösterilecek metin
      ) : (
        <ul>
          {uniqueItems.map((itemId) => {
            const item = cartItems.find((item) => item.id === itemId);
            return (
              <li key={item.id} className="cart-item">
                {item.name} - {item.price} ({countTotalQuantity(item.id)}){" "}
                {/* Ürün adı, fiyatı ve toplam adet */}
                <button onClick={() => increaseQuantity(item.id)}>
                  +
                </button>{" "}
                {/* Adeti artırmak için buton */}
                <button onClick={() => decreaseQuantity(item.id)}>
                  -
                </button>{" "}
                {/* Adeti azaltmak için buton */}
                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>{" "}
                {/* Ürünü sepetten çıkarmak için buton */}
              </li>
            );
          })}
        </ul>
      )}
      <button onClick={clearCart} className="clear-cart-btn">
        Clear Cart {/* Sepeti temizlemek için buton */}
      </button>
    </div>
  );
};

export default Cart;
