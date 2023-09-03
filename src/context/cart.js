import { useState, useEffect, createContext, useContext } from "react";

import { useAuth } from "./auth";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    let existingCart = localStorage.getItem('cart');
    if (existingCart) setCart(JSON.parse(existingCart));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };