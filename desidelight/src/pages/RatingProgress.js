// src/components/ReviewForm.js
import axios from "axios";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./style.module.css";

const RatingProgress = ({ data, onsubmit }) => {
  const id = data;
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rating || !comment) {
      toast.error("Provide Data...");
      setError("Please provide both rating and comment.");
      return;
    }

    try {
      await axios.post(`http://localhost:8000/food/${id}/add_review/`, {
        rating,
        comment,
      });

      setRating("");
      setComment("");
      toast.success("Review added successfully!");
      onsubmit();
    } catch (err) {
      toast.success("Review added successfully!");
      onsubmit();
    }
  };

  return (
    <>
      <div className={`${style.review_container} container`}>
        <form onSubmit={handleSubmit}>
          <center
            style={{
              textAlign: "center",
              fontSize: "20px",
              color: "white",
              padding: "10px",
            }}
          >
            <FaPencilAlt />
            &nbsp; Add Review
          </center>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="container mt-2 text-light">
            <label>
              Rating (1-5) :&nbsp;
              <input
                style={{ borderRadius: "10px" }}
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </label>
          </div>
          <div className="container text-light mt-2">
            <label>
              Comment :&nbsp;
              <textarea
                style={{ borderRadius: "10px" }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
          </div>
          <button
            className="btn btn-success mx-auto d-block mt-2 w-100"
            type="submit"
          >
            Add Review
          </button>
        </form>
      </div>
    </>
  );
};

export default RatingProgress;
