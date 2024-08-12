import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import style from "./style.module.css";
const Cart = ({ email }) => {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/cart/${email}/`
        );
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [email]);

  const handleQuantityChange = async (foodId, newQuantity) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/update/${email}/${foodId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }

      const updatedItem = await response.json();
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.food.id === updatedItem.food.id
            ? {
                ...item,
                quantity: updatedItem.quantity,
                price: updatedItem.price,
                total_item_price: updatedItem.total_item_price,
              }
            : item
        ),
      }));
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleRemoveItem = async (foodId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/remove/${email}/${foodId}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove cart item");
      }

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.food.id !== foodId),
      }));
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  if (!cart.items.length) return <div>Your cart is empty.</div>;
  console.log(cart);
  return (
    <div className={`row ${style.cart_card}`}>
      {cart.items.map((item) => (
        <div className={`col-sm-6 ${style.cart_item}`} key={item.food.id}>
          <h3>{item.food.name}</h3>
          <p>
            <b>Restaurant : </b> {item.restaurant.name}
          </p>
          <p>
            <b>Quantity : </b>
            {item.quantity}
          </p>
          <p>
            <b>Price per item: </b>
            {item.price} /-
          </p>
          <p>
            <b>Total : </b>
            {item.total_item_price} /-
          </p>
          <div
            style={{
              display: "flex",
              placeContent: "center",
              gap: "10px",
              fontSize: "30px",
            }}
          >
            <button
              className="btn text-success"
              onClick={() =>
                handleQuantityChange(item.food.id, item.quantity + 1)
              }
            >
              <FaPlus />
            </button>
            <b
              style={{
                textDecoration: "",
                color: "#c2c2c1",
                marginTop: "6px",
              }}
            >
              {item.quantity}
            </b>
            <button
              className="btn text-success"
              onClick={() =>
                handleQuantityChange(item.food.id, item.quantity - 1)
              }
            >
              <b>
                {" "}
                <FaMinus />
              </b>
            </button>
          </div>
          {/* <button
            className="btn btn-success"
            onClick={() =>
              handleQuantityChange(item.food.id, item.quantity + 1)
            }
          >
            <FaPlus />
          </button>
          <button
            className="btn btn-success"
            onClick={() =>
              handleQuantityChange(item.food.id, item.quantity - 1)
            }
          >
            <FaMinus />
          </button> */}
          <button
            className="btn btn-danger mt-4"
            onClick={() => handleRemoveItem(item.food.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};
export default Cart;
