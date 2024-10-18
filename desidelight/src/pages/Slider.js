import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "../components/CardCSS.css";

const Slider = () => {
  const sliderRef = useRef(null);
  const [foods, setFoods] = useState([]);
  const user = localStorage.getItem("userEmail");

  useEffect(() => {
    axios
      .get("http://localhost:8000/food/top-foods/")
      .then((response) => {
        setFoods(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(foods);
  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth / 2,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth / 2,
      behavior: "smooth",
    });
  };
  const addToCart = (email, foodId, quantity, price, restaurant_id) => {
    if (user) {
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

          toast.success("Food Added to Cart");
        })
        .catch((error) => {
          console.error(
            "There was an error adding the item to the cart!",
            error
          );
        });
    } else {
      toast.error("Please Login to add food to cart");
    }
  };
  const handleAddToCart = (id, price, restaurant) => {
    const email = localStorage.getItem("userEmail");
    addToCart(email, id, 1, price, restaurant);
  };
  if (foods.length === 0) {
    return (
      <div
        style={{
          display: "grid",
          placeContent: "center",
          width: "100%",
          height: "600px",
        }}
      >
        <div class="loader">
          <span class="loader-text">loading</span>
          <span class="load"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container d-flex">
        <h5 className="container">Top Foods for you !!!</h5>
        <div className=" slider-controls">
          <button className="slider-btn left" onClick={scrollLeft}>
            <FaArrowLeft />
          </button>
          <button className="slider-btn right" onClick={scrollRight}>
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="container slider-container">
        <div className="container slider" ref={sliderRef}>
          {foods.map((food, index) => (
            <div className="slider-item">
              <div className="card">
                <div className="card-image-container">
                  <img
                    src={`http://localhost:8000${food.image}`}
                    alt={food.name}
                    className="card-image"
                  />
                  <div className="card-discount">{food.description}</div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{food.name}</h3>
                  <div className="card-rating">
                    <span className="rating-text">
                      ⭐&nbsp;{food.average_rating}
                    </span>
                  </div>
                  <div className="d-flex gap-4">
                    <p className="card-category">{food.restaurant}</p>
                    <p className="card-category">{food.price}/-</p>
                    <button
                      className="btn text-dark"
                      style={{ fontWeight: "bold" }}
                      onClick={() =>
                        handleAddToCart(food.id, food.price, food.restaurant)
                      }
                    >
                      <FaCartPlus />
                      &nbsp;ADD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
