// src/components/Search.js

import axios from "axios";
import React, { useState } from "react";
import {
  FaCartPlus,
  FaSearch,
  FaShoppingCart,
  FaStar,
  FaWpexplorer,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
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
    <div
      className="container my-4"
      style={{ display: "grid", placeContent: "center" }}
    >
      <h2>Restaurant Search Results</h2>
      <div className="row gap-5   w-100">
        {results.restaurants.map((restaurant) => (
          <div
            className="col-md-12 mt-4"
            style={{
              backgroundColor: "#f5f5f5",
              display: "grid",
              placeContent: "center",
              padding: "15px",
              borderRadius: "10px",
            }}
            key={restaurant.id}
          >
            <div className={style.Topfoods}>
              <div style={{ marginTop: "10px" }}>
                <h5 className="text-success">{restaurant.name}</h5>
                <p style={{ color: "#686B78" }}>
                  <b>Address : </b>
                  {restaurant.address}
                </p>
                <p style={{ color: "#686B78" }}>
                  <b>Foods Available : </b>
                  {restaurant.food_count}
                </p>

                {restaurant.food_items.map((food) => (
                  <div className="mt-5">
                    <h5>
                      <b>{food.name}</b>
                    </h5>
                    <p>
                      <b>Price: </b>
                      {food.price}/-
                    </p>
                    <p>
                      <b>Category:</b> {food.category}
                    </p>
                    <div className="d-flex gap-3">
                      <button className="btn btn-outline-success">
                        <FaCartPlus /> <b>Add to cart</b>
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => handleDetailsClick(food.id)}
                      >
                        <b>See</b>
                      </button>
                    </div>
                  </div>
                ))}

                <button className="btn btn-success w-100 mt-5">
                  <FaWpexplorer />
                  &nbsp;
                  <b> Check Restaurant</b>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-5 container-fluid" style={{ paddingTop: "50px" }}>
      <div className="mt-5 container p-3" style={{}}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px" }}>
          <input
            style={{
              border: "2px solid #f5f5f5",
              padding: "10px",
              borderRadius: "10px",
              width: "100%",
              boxShadow: "0 0 10px rgba(0, 0, 0);",
            }}
            className="form-control"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
          />
          <button type="submit" className="btn btn-success">
            <FaSearch />
          </button>
        </form>
      </div>
      {loading && (
        <p className="text-center">
          <Spinner />
        </p>
      )}
      {error && <p>{error}</p>}
      {results.search_type === "food" && fooddearch()}
      {results.search_type === "restaurant" && restaurantsearch()}
      {results.search_type === "none" && (
        <p className="text-center">No results found.</p>
      )}
    </div>
  );
};

export default Search;
