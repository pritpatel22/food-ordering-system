import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
const Cart = ({ email }) => {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  const handleNavigateToexplore = () => {
    navigate("/explore");
  };

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
    // 3FWUZWXBYRFDUPBDBSGZDTYZ  +12512903756 e97a17f66cfbdc25e0db32a5f4c0288f ACe347fbda9a0e85a95535315dfb7a8316
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
  const handlecheckout = () => {
    navigate("/payment", { state: { cart: cart } });
  };

  if (!cart.items.length)
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "grid",
          placeContent: "center",
          border: "2px solid #c2c2c2",
        }}
      >
        Your cart is empty.
        <button
          className="btn btn-success mt-1 mx-auto d-block"
          onClick={handleNavigateToexplore}
        >
          Explore Delights
        </button>
      </div>
    );
  console.log(cart.items);
  return (
    <div className={` ${style.cart_card}`}>
      <div className={`row gap-5`}>
        {cart.items.map((item) => (
          <div className={`col-sm-4 ${style.cart_item}`} key={item.food.id}>
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
      <div
        style={{
          marginTop: "100%",
          fontFamily: "cursive",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>Total : {cart.total_amt}/-</h3>&nbsp;&nbsp; &nbsp;&nbsp;
        <button className="btn btn-success" onClick={handlecheckout}>
          <IoBagCheckOutline /> Check out
        </button>
      </div>
    </div>
  );
};
export default Cart;
