// src/components/Search.js

import axios from "axios";
import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    foods: [],
    restaurants: [],
    search_type: "none",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:8000/food/search/?q=${query}`
      );
      setResults(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to fetch search results.");
    }

    setLoading(false);
  };

  const handleDetailsClick = (id) => {
    navigate(`/food/${id}`);
  };

  const fooddearch = () => (
    <div className="container my-4">
      <h2>Food Search Results</h2>
      <div className="row gap-5">
        {results.foods.map((food) => (
          <div
            className="col-md-3 mt-4"
            style={{
              backgroundColor: "lightgray",
              display: "grid",
              placeContent: "center",
              padding: "15px",
              borderRadius: "10px",
            }}
            key={food.id}
          >
            <Link
              to={`/food/${food.id}`}
              onClick={() => handleDetailsClick(food.id)}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className={style.Topfoods}>
                <div style={{ marginTop: "10px" }}>
                  <h5>{food.name}</h5>
                  <div className="d-flex gap-1">
                    <strong style={{ fontSize: "20px" }}>
                      <FaStar />
                    </strong>{" "}
                    <p
                      className="font-weight-bold "
                      style={{ fontSize: "20px" }}
                    >
                      {food.average_rating
                        ? food.average_rating.toFixed(1)
                        : "no ratings"}
                    </p>
                  </div>
                  <p>
                    <strong>Price:</strong> {food.price}/-
                  </p>
                  <p>
                    <b>Restaurant : </b>
                    {food.restaurant_name}
                  </p>
                  <p>
                    <b>Address : </b>
                    {food.restaurant_address}
                  </p>
                  <button className="btn btn-success w-100">
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  const restaurantsearch = () => (
    <div className="container my-4">
      <h2>Restaurant Search Results</h2>
      <div className="row gap-5">
        {results.restaurants.map((restaurant) => (
          <div
            className="col-md-3 mt-4"
            style={{
              backgroundColor: "lightgray",
              display: "grid",
              placeContent: "center",
              padding: "15px",
              borderRadius: "10px",
            }}
            key={restaurant.id}
          >
            <Link
              to={`/restaurant/${restaurant.id}`} // Adjust this route as needed
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className={style.Topfoods}>
                <div style={{ marginTop: "10px" }}>
                  <h5>{restaurant.name}</h5>
                  <p>
                    <b>Address : </b>
                    {restaurant.address}
                  </p>
                  <p>
                    <b>Foods Available : </b>
                    {restaurant.food_count}
                  </p>
                  <ul>
                    {restaurant.food_items.map((food) => (
                      <li key={food.id}>
                        <img src={`/media/${food.image}`} alt={food.name} />
                        <p>{food.name}</p>
                        <p>Price: ${food.price}</p>
                        <p>Category: {food.category}</p>
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-success w-100">
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-5">
      <h2>Search Results</h2>
      <form onSubmit={handleSearch}>
        <input
          className="form-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
        <button type="submit" className="btn btn-success">
          <FaSearch />
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {results.search_type === "food" && fooddearch()}
      {results.search_type === "restaurant" && restaurantsearch()}
      {results.search_type === "none" && <p>No results found.</p>}
    </div>
  );
};

export default Search;
