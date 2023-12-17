// ShoppingCartContext.js

import React, { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  // ShoppingCartProvider bileşeni bir Context sağlayıcısı olarak kullanılıyor ve children prop'u içindeki diğer bileşenleri render ediyor
  // Bu children, ShoppingCartProvider bileşeninin doğrudan bir üst parenta sahip olmaması durumunda,
  // Context API kullanarak veri paylaşımını sağlar.
  // Bu sayede, ShoppingCartProvider bileşeninin içindeki verilere ve işlevlere erişebilir ve bu verileri tüketen bileşenlerde kullanabilirsiniz.
  const [cartItems, setCartItems] = useState([]);

  // Sepete ürün ekleme işlevi
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // Eğer ürün zaten sepette varsa aynı ürünü sepete eklemek yerine sepetteki ürünün adetini artır.
      // Bunu yapmazsak eğer başka sayfada aynı ürün örneğin 3 kez eklenirse,
      // sepetteyken aynı üründen 3 adet yerine -- A ürünü(3) --, aynı ürün üçer kere sayılacaktır -- A ürünü, A ürünü, A ürünü --
      // Buda sepetteyken ürün adetini artırmak için + butonuna bastığımızda ürünü 1 kez artırmak yerine her seferinde 3 kez artıracaktır,
      // Aynı ürünü sürekli sepete ekleyip tek bir ürün altında sayıyı göstermek yerine;
      /*  const addToCart = (item) => {
              setCartItems([...cartItems, { ...item, quantity: 1 }]); 
            };
       */
      // Ürün zaten sepette varsa sadece adetini artırıyoruz
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // Eğer ürün sepette yoksa yeni bir ürün olarak ekle
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Sepetten ürün çıkarma işlevi
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Ürün adedini artırma işlevi
  const increaseQuantity = (itemId) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  // Ürün adedini azaltma işlevi
  const decreaseQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  // Sepeti temizleme işlevi
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
