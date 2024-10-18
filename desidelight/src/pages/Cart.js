import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "../components/CardCSS.css";
import style from "./style.module.css";
const Cart = ({ emaill }) => {
  const { email } = useParams();
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
  }, []);

  const handleQuantityChange = async (foodId, newQuantity) => {
    if (newQuantity == 0) {
      handleRemoveItem(foodId);
    }
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
      //refresh page
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
      <>
        <div
          style={{
            height: "100vh",
            display: "grid",
            padding: "50px",
            placeContent: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              height: "300px",
              backgroundImage:
                "url(https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              marginInline: "auto",
            }}
          ></div>
          <h6 className="text-center mt-5">Your cart is empty</h6>
          <button
            className="btn btn-success mt-1 mx-auto d-block"
            onClick={handleNavigateToexplore}
          >
            Explore Delights
          </button>
        </div>
      </>
    );

  return (
    <div style={{ padding: "20px" }}>
      <div
        className={` ${style.cart_card}`}
        style={{
          padding: "20px",
          gap: "20px",
          display: "grid",
          placeContent: "center",
        }}
      >
        <div className="card-container">
          <h4 className="text-center text-success">CART</h4>
          {cart.items.map((item, index) => (
            <div className="cart-item">
              <div className="item-info">
                <img
                  src={`http://localhost:8000${item.food.image}`}
                  alt="Item Image"
                  className="item-image"
                />
                <div className="item-details">
                  <h3>{item.food.name}</h3>
                  <p>Quantity : {item.quantity}</p>
                  <p>Price: {item.food.price}</p>
                </div>
              </div>
              <div className="item-controls">
                <div className="quantity-controls">
                  <button
                    className="btn"
                    onClick={() =>
                      handleQuantityChange(item.food.id, item.quantity - 1)
                    }
                  >
                    <FaMinus />
                  </button>
                  <small
                    style={{
                      color: "black",
                      marginTop: "6px",
                    }}
                  >
                    {item.quantity}
                  </small>
                  <button
                    className="btn"
                    onClick={() =>
                      handleQuantityChange(item.food.id, item.quantity + 1)
                    }
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="item-price">{item.total_item_price}</div>
                <button
                  className="btn remove-item"
                  onClick={() => handleRemoveItem(item.food.id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            fontFamily: "cursive",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "50px",
          }}
        >
          <h5>Total : {cart.total_amt}/-</h5>&nbsp;&nbsp; &nbsp;&nbsp;
          <button className="btn btn-success btn-sm" onClick={handlecheckout}>
            <IoBagCheckOutline /> Check out
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
