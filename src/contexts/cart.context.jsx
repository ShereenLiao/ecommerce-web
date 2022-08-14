import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
    //If found, incremeny quantity
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    //not found the item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount : 0
});

//set alias
//Any components inside the tree can get the value
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState([]);
  
  useEffect(()=>{
    const newCartCount = cartItems.reduce((previousCount, currentItem) => previousCount + currentItem.quantity,
  0);
    setCartCount(newCartCount);
  },[cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, setCartCount};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
