// components/FoodList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 
import axios from "axios";
import { toast } from "react-toastify";
import "../components/CardCSS.css";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";
import fetchFoods from "../service/api";
const Explore = () => {
  const [foods, setFoods] = useState([]);
  const [loader, setloader] = useState(true);
  const history = useNavigate();
  const { cart } = useCart();
  const user = localStorage.getItem("userEmail");
  const access_token = localStorage.getItem("access_token");
  const addToCart = (email, foodId, quantity, price, restaurant_id) => {
    axios
      .post("http://localhost:8000/api/cart/add/", {
        email,
        food_id: foodId,
        quantity,
        price,
        restaurant_id: restaurant_id,
      })
      .then((response) => {
        console.log(response.data);
        setloader(false);
        toast.success("Food Added to Cart");
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart!", error);
        setloader(false);
      });
  };
  const handleAddToCart = (id, price, restaurant) => {
    if (user) {
      const email = localStorage.getItem("userEmail");
      addToCart(email, id, 1, price, restaurant);
    } else {
      toast.error("please login to add food items to cart");
    }
  };
  const handleDetailsClick = (id) => {
    history(`/food/${id}`);
  };
  useEffect(() => {
    const getFoods = async () => {
      try {
        const data = await fetchFoods();
        setFoods(data);
        setloader(false);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    getFoods();
  }, []);

  return (
    <div
      className={`container row mt-5 mx-auto `}
      style={{ fontFamily: "cursive" }}
    >
      <h3
        className="mt-5 text-center"
        style={{
          fontSize: "2rem",
          color: "#198754",
          textShadow: "0px 0px 10px",
          fontWeight: "bold",
          marginTop: "20px",
          textDecoration: "underline",
        }}
      >
        Explore our Delights
      </h3>
      <div className="mainCard">
        {loader ? (
          <Loader />
        ) : (
          foods.map((food) => (
            <div className="food-card">
              <div className="food-card-header">
                <p>{food.restaurant_name}</p>
                <p className="food-card-rating">
                  <span>40-45 MINS</span>
                </p>
              </div>
              <hr />
              <div className="food-card-body">
                <div className="food-card-info">
                  <h3>{food.name}</h3>
                  <p>₹{food.price}</p>
                  <button
                    className="details-button"
                    onClick={() => handleDetailsClick(food.id)}
                  >
                    More Details
                  </button>
                </div>
                <div className="food-card-image-container">
                  <img src={`${food.image}`} alt="Vada Pav" />
                  <button
                    className="add-button"
                    onClick={() =>
                      handleAddToCart(food.id, food.price, food.restaurant_name)
                    }
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
