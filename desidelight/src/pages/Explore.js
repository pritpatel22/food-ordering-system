// components/FoodList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { fetchFoods } from "../services/api";
import { FaArrowRight } from "react-icons/fa";
import fetchFoods from "../service/api";
import style from "./style.module.css";
const Explore = () => {
  const [foods, setFoods] = useState([]);
  const history = useNavigate();

  const handleDetailsClick = (id) => {
    history(`/food/${id}`);
  };
  useEffect(() => {
    const getFoods = async () => {
      try {
        const data = await fetchFoods();
        setFoods(data);
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
      {foods.map((food) => (
        <div key={food.id} className={`col-sm-4 mt-5`}>
          <div className={`card ${style.foodcard}`}>
            <div
              className="card-header d-flex"
              style={{ justifyContent: "space-between", color: "#3E4152" }}
            >
              <h6>
                <b>{food.restaurant_name}</b>
              </h6>

              <button
                className="btn"
                onClick={() => handleDetailsClick(food.id)}
              >
                <FaArrowRight />
              </button>
            </div>
            <div className="mt-2">
              <img
                src={food.image}
                alt={food.name}
                className={`img-fluid rounded-5 mx-auto d-block ${style.foodimage}`}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title text-success">{food.name}</h5>
              <p className="card-text">{food.description}</p>
              <p className="card-text">
                <b>Price:</b> {food.price}
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button className={`${style.CartBtn} btn btn-success`}>
                <span className={style.IconContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    fill="rgb(17, 17, 17)"
                    class="cart"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                  </svg>
                </span>
                <p className={style.text}>Add to Cart</p>
              </button>
              <a
                className="btn btn-outline-success mb-2"
                onClick={() => handleDetailsClick(food.id)}
              >
                Get Details
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;
