import { useState, useEffect, createContext, useContext } from "react";

import { useAuth } from "./auth";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useAuth();

  const { user } = auth;

  useEffect(() => {
    let existingCart = localStorage.getItem(`${user?.id}`);
    const currentUser = localStorage.getItem('auth');
    if (existingCart) setCart(JSON.parse(existingCart));
    if (!currentUser) setCart([])
  }, [auth]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };