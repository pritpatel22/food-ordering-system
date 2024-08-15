// src/components/TopFoods.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

const Topfoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopFoods = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/food/top-foods/"
        );
        setFoods(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load top foods");
        setLoading(false);
      }
    };

    fetchTopFoods();
  }, []);
  function handleDetailsClick(id) {
    navigate(`/food/${id}`);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  console.log(foods);
  return (
    <div className="container my-4 mt-3" style={{}}>
      <h2 className="text-center mt-4">Top Rated Foods</h2>
      <div className="row">
        {foods.map((food) => (
          <div className="col-md-3 mt-4" key={food.id}>
            <a
              href=""
              onClick={() => handleDetailsClick(food.id)}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className={style.Topfoods}>
                <img
                  src={`http://localhost:8000${food.image}`}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "20px",
                    objectFit: "revert-layer",
                  }}
                  alt={food.name}
                />
                <div style={{ marginTop: "10px" }}>
                  <h5>{food.name}</h5>
                  <p>
                    <strong>Restaurant:</strong> {food.restaurant}
                  </p>
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
                        : "No ratings are available"}
                    </p>
                  </div>
                  <p>
                    <strong>Price:</strong> {food.price}/-
                  </p>
                  <button className="btn btn-success w-25">
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topfoods;
