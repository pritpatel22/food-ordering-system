// src/context/CartContext.js
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:8000/cart/");
      setCart(response.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const addItemToCart = async (foodId, quantity) => {
    try {
      await axios.post("http://localhost:8000/cart/add_item/", {
        food_id: foodId,
        quantity,
      });
      fetchCart();
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  const removeItemFromCart = async (foodId) => {
    try {
      await axios.post("http://localhost:8000/cart/remove_item/", {
        food_id: foodId,
      });
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  const updateItemInCart = async (foodId, quantity) => {
    try {
      await axios.post("http://localhost:8000/cart/update_item/", {
        food_id: foodId,
        quantity,
      });
      fetchCart();
    } catch (error) {
      console.error("Failed to update item in cart", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        updateItemInCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
