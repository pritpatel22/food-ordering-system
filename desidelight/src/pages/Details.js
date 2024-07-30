// components/Detail.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import style from "./style.module.css";

const Details = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/food/${id}/`);
        setFood(response.data);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  if (!food) return <div style={{ marginTop: "300px" }}>Loading...</div>;
  //   const ingredients = food.ingredients ? food.ingredients.split("\n") : [];

  return (
    <div className={`my-4 ${style.detail_container}`}>
      <div className={style.detail_card}>
        <div className={style.detail_image}>
          {/* go back btn */}
          <img src={food.image} className="img-fluid" alt={food.name} />
        </div>
        <div className={style.detail_content}>
          <div style={{ display: "flex", gap: "20px" }}>
            <a className="btn btn-success mb-5" href="/explore">
              <FaArrowLeft />
            </a>
            <h1 className={style.detail_title}>{food.name}</h1>
          </div>
          <p className={style.detail_p}>
            <strong>Description:</strong> {food.description}
          </p>
          <p className={style.detail_p}>
            <strong>Price:</strong> ${food.price}
          </p>
          <p className={style.detail_p}>
            <strong>Category:</strong> {food.category}
          </p>
          {/* ingredients info */}
          <div>
            <h2>Ingredients:</h2>
            <ul className={style.detail_ul}>
              {food.ingredients.split("\n").map((ingredient, index) => (
                <li className={style.detail_li} key={index}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Nutrition Information:</h4>
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
          </div>
          <p className={style.detail_p}>
            <strong>Restaurant:</strong> {food.restaurant_info}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
