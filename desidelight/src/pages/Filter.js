import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import img from "../assets/notavialbe.avif";
import "../components/CardCSS.css";

const Filter = () => {
  const user = localStorage.getItem("userEmail");
  const history = useNavigate();
  const [fooditem, setFoodItems] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    filter: false,
    sortBy: false,
    ratings: false,
    fastDelivery: false,
    pureVeg: false,
    offers: false,
    priceRange1: false,
    priceRange2: false,
  });

  const handleFilterClick = (filter) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const filterItems = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/filter/",
        activeFilters
      );
      setFoodItems(response.data); // Assuming Django returns results
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    filterItems();
  }, [activeFilters]);

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
      toast.error("Please login to add items to cart");
    }
  };

  const handleAddToCart = (id, price, restaurant) => {
    const email = localStorage.getItem("userEmail");
    addToCart(email, id, 1, price, restaurant);
  };

  const handleDetailsClick = (id) => {
    history(`/food/${id}`);
  };

  return (
    <>
      <div className="container filter-navbar">
        <button
          className={`btn filter-button ${
            activeFilters.filter ? "active" : ""
          }`}
          onClick={() => handleFilterClick("filter")}
        >
          Filters
        </button>
        <button
          className={`btn filter-button ${
            activeFilters.sortBy ? "active" : ""
          }`}
          onClick={() => handleFilterClick("sortBy")}
        >
          Price&nbsp;
          <FaSortDown />
        </button>

        <button
          className={`btn filter-button ${
            activeFilters.ratings ? "active" : ""
          }`}
          onClick={() => handleFilterClick("ratings")}
        >
          Ratings&nbsp;
          <FaSortDown />
        </button>

        <button
          className={`btn filter-button ${
            activeFilters.priceRange1 ? "active" : ""
          }`}
          onClick={() => handleFilterClick("priceRange1")}
        >
          Rs. 100 - Rs.500
        </button>
        <button
          className={`btn filter-button ${
            activeFilters.priceRange2 ? "active" : ""
          }`}
          onClick={() => handleFilterClick("priceRange2")}
        >
          Less than Rs. 100
        </button>
      </div>
      <br />
      <div className="container mainCard">
        {fooditem.length === 0 ? (
          <div
            style={{
              width: "100%",
            }}
          >
            <img
              src={img}
              className="mx-auto d-block"
              width={100}
              height={100}
            />
          </div>
        ) : (
          fooditem.map((food) => (
            <div className="food-card" key={food.id}>
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
                  <img
                    src={`http://localhost:8000${food.image}`}
                    alt={food.name}
                  />
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
    </>
  );
};

export default Filter;
