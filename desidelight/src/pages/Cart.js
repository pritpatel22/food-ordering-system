import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = ({ email }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/cart/${email}/`
        );
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [email]);

  const updateQuantity = async (foodId, newQuantity) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/cart/${email}/${foodId}/`,
        {
          quantity: newQuantity,
        }
      );
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.food.id === foodId ? { ...item, quantity: newQuantity } : item
        ),
      }));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (foodId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/cart/remove/${email}/${foodId}/`
      );
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.food.id !== foodId),
      }));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-sm-3">
      <h2>Your Cart</h2>
      {cart.items.map((item) => (
        <div key={item.food.id}>
          <img src={item.food.image} alt={item.food.name} />
          <h3>{item.food.name}</h3>
          <p>Restaurant: {item.restaurant.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Total Price: ${item.get_total_item_price}</p>
          <button
            onClick={() => updateQuantity(item.food.id, item.quantity + 1)}
          >
            Increase Quantity
          </button>
          <button
            onClick={() => updateQuantity(item.food.id, item.quantity - 1)}
          >
            Decrease Quantity
          </button>
          <button onClick={() => removeItem(item.food.id)}>
            Remove from Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
