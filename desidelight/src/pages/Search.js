import axios from "axios";
import React, { useState } from "react";
import { FaSearch, FaStar, FaWpexplorer } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import style from "./style.module.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const user = localStorage.getItem("userEmail");
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
      toast.error("Please login to add food to cart");
    }
  };
  const handleAddToCart = (id, price, restaurant) => {
    const email = localStorage.getItem("userEmail");
    addToCart(email, id, 1, price, restaurant);
  };

  const fooddearch = () => (
    <div className="container my-4">
      <h2>Food Search Results</h2>
      <div
        className="d-flex gap-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {results.foods.map((food) => (
          <Link
            to={`/food/${food.id}`}
            onClick={() => handleDetailsClick(food.id)}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="food-card">
              <div className="food-card-header">
                <p>{food.restaurant_name}</p>
                <p className="food-card-rating">
                  <span>40-45 MINS</span>
                  <br />
                  <span>
                    {food.average_rating
                      ? food.average_rating.toFixed(1)
                      : "no ratings"}
                    &nbsp;
                    <FaStar style={{ marginBottom: "5px" }} />
                  </span>
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
                    alt="Vada Pav"
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
          </Link>
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
      <div className="" style={{ display: "grid", placeContent: "center" }}>
        {results.restaurants.map((restaurant) => (
          <div
            className="mt-4"
            style={{
              display: "grid",
              placeContent: "center",
              padding: "15px",
              borderRadius: "10px",
            }}
            key={restaurant.id}
          >
            <div className={`container ${style.Topfoods}`}>
              <div className="container" style={{ marginTop: "10px" }}>
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
                  <Link
                    to={`/food/${food.id}`}
                    onClick={() => handleDetailsClick(food.id)}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="food-card">
                      <div className="food-card-header">
                        <p>{food.name}</p>
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
                            src={`http://localhost:8000/media/${food.image}`}
                            alt="Vada Pav"
                          />
                          <button
                            className="add-button"
                            onClick={() =>
                              handleAddToCart(
                                food.id,
                                food.price,
                                food.restaurant_name
                              )
                            }
                          >
                            ADD
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
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
    <div
      className="mt-5 container-fluid"
      style={{ paddingTop: "50px", height: "100vh" }}
    >
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
        <div style={{ display: "grid", placeContent: "center" }}>
          <p className="text-center">
            <Spinner />
          </p>
        </div>
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
