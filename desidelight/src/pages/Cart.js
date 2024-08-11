// src/components/Cart.js
import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeItemFromCart, fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemove = (foodId) => {
    removeItemFromCart(foodId);
  };

  return (
    <div className="container my-4">
      <h2>Your Cart</h2>
      <div className="row">
        {cart.items.map((item) => (
          <div className="col-md-3 mt-4" key={item.id}>
            <div className="card">
              <img
                src={`/media/${item.food.image}`}
                className="card-img-top"
                alt={item.food.name}
              />
              <div className="card-body">
                <h5 className="card-title">{item.food.name}</h5>
                <p className="card-text">Price: ${item.food.price}</p>
                <p className="card-text">Quantity: {item.quantity}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item.food.id)}
                >
                  <FaTrashAlt /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/checkout" className="btn btn-success">
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default Cart;
