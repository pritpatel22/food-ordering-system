// components/Detail.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendarCheck, FaStar } from "react-icons/fa";
import { FcComments } from "react-icons/fc";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import RatingProgress from "./RatingProgress";
import style from "./style.module.css";
const Details = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [form, setform] = useState(false);
  const { addProduct } = useCart();

  const handleaddtocart = () => {
    addProduct(food, 1);
  };

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/food/${id}/`);
        setFood(response.data);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }

      // Calculate average rating
    };

    fetchFoodDetails();
  }, [id]);

  function handleformvisibility() {
    setform(!form);
  }
  function handleReviewAdded() {
    axios
      .get(`http://localhost:8000/food/${id}/`)
      .then((response) => {
        setFood(response.data);
      })
      .catch((error) => {
        console.error("Error refreshing food details:", error);
      });
  }
  console.log(food);
  // const { rating_summary, comments } = food;
  if (!food)
    return (
      <div style={{ marginTop: "300px", textAlign: "center" }}>
        <ul class={style.wave_menu}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  //   const ingredients = food.ingredients ? food.ingredients.split("\n") : [];
  const info = {
    id: id,
    onsubmit: handleReviewAdded,
  };
  let sum = 0;
  let c = 0;
  Object.entries(food.rating_summary).map(([rating, count]) => {
    c += count;
  });
  // const average = sum / Object.keys(food.rating_summary).length;
  let totalScore = 0;
  let totalRatings = 0;

  for (const [rating, count] of Object.entries(food.rating_summary)) {
    totalScore += parseInt(rating) * count;
    totalRatings += count;
  }
  const average =
    totalRatings > 0 ? +(totalScore / totalRatings).toFixed(2) : 0;

  return (
    <>
      <div className={`my-4 ${style.detail_container}`}>
        <div className={style.detail_card}>
          <div className={style.detail_image}>
            {/* go back btn */}
            <img src={food.image} className="img-fluid" alt={food.name} />
          </div>
          <div className={style.detail_content}>
            <div style={{ display: "flex", gap: "20px" }}>
              <Link to="/explore" className="btn btn-success mb-5">
                <FaArrowLeft />
              </Link>
              <h1 className={style.detail_title}>{food.name}</h1>
            </div>
            <p className={`${style.detail_p} mt-2`}>
              <strong style={{ fontSize: "20px" }}>Description : </strong>
              {food.description}
            </p>
            <p className={style.detail_p}>
              <strong style={{ fontSize: "20px" }}>Price:</strong> {food.price}
              /-
            </p>
            <p className={style.detail_p}>
              <strong style={{ fontSize: "20px" }}>Category:</strong>{" "}
              {food.category}
            </p>
            {/* ingredients info */}
            <div>
              <strong style={{ fontSize: "20px" }}>Ingredients:</strong>
              {food.ingredients ? (
                <ul className={style.detail_ul}>
                  {food.ingredients.split("\n").map((ingredient, index) => (
                    <li className={style.detail_li} key={index}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No ingredients available</p>
              )}
            </div>
            <div>
              <strong style={{ fontSize: "20px" }}>
                Nutrition Information:
              </strong>
              {food.nutrition_info ? (
                <ul className={style.detail_ul}>
                  <li className={style.detail_li}>
                    <strong>Total Fat:</strong> {food.nutrition_info.Total_Fat}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Calories:</strong> {food.nutrition_info.Calories}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Saturated Fat:</strong>{" "}
                    {food.nutrition_info.Saturated_Fat}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Trans Fat:</strong> {food.nutrition_info.Trans_Fat}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Sodium:</strong> {food.nutrition_info.Sodium}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Total Carbohydrates:</strong>{" "}
                    {food.nutrition_info.Total_Carbohydrates}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Dietary Fiber:</strong>{" "}
                    {food.nutrition_info.Dietary_Fiber}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Sugars:</strong> {food.nutrition_info.Sugars}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Protein:</strong> {food.nutrition_info.Protein}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Vitamin A:</strong> {food.nutrition_info.Vitamin_A}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Vitamin C:</strong> {food.nutrition_info.Vitamin_C}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Calcium:</strong> {food.nutrition_info.Calcium}
                  </li>
                  <li className={style.detail_li}>
                    <strong>Iron:</strong> {food.nutrition_info.Iron}
                  </li>
                </ul>
              ) : (
                <p>No nutrition information available.</p>
              )}
            </div>
            <p className={style.detail_p}>
              <strong style={{ fontSize: "20px" }}>Restaurant:</strong>{" "}
              {food.restaurant_info}
            </p>
            <strong style={{ fontSize: "20px" }}>Ratings Summary:</strong>
            <div
              style={{
                display: "flex",
                gap: "30px",
                backgroundColor: "#f1f1f1",
                padding: "10px",
                width: "30%",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <div style={{ display: "grid", placeContent: "center" }}>
                <h1>{average}</h1>
                <small>{c}&nbsp;reviews</small>
              </div>
              <div>
                {food.rating_summary &&
                Object.keys(food.rating_summary).length === 0 ? (
                  <li>No ratings available.</li>
                ) : (
                  food.rating_summary &&
                  Object.entries(food.rating_summary).map(([rating, count]) => (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <div className="progress w-100 mt-1" role="progressbars">
                        <b>
                          <h6>
                            {rating}&nbsp;
                            <FaStar style={{ marginBottom: "5px" }} />
                            &nbsp;&nbsp;
                          </h6>
                        </b>
                        <div
                          className={`progress-bar bg-success`}
                          style={{ width: `${count * 10}px` }}
                        >
                          {count}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <strong style={{ fontSize: "20px", marginTop: "10px" }}>
              <FcComments style={{ color: "black" }} />
              &nbsp; Comments:
            </strong>
            <ul>
              {food.comments && food.comments.length === 0 ? (
                <li>No comments available.</li>
              ) : (
                food.comments.map((review, index) => (
                  <p>{review.comment || "No Comment Available"}</p>
                ))
              )}
            </ul>
            <button
              className="mt-2 btn btn-success"
              onClick={handleformvisibility}
            >
              <FaCalendarCheck />
              &nbsp;{form ? "close" : "Add Review"}
            </button>

            {form && <RatingProgress data={id} onsubmit={handleReviewAdded} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
