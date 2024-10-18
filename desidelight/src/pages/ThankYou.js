import React from "react";
import { FaHome } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

const ThankYou = () => {
  const navigate = useNavigate();
  return (
    <div style={{ height: "100vh", display: "grid", placeContent: "center" }}>
      <div className={`${style.card}`}>
        <div className={style.header}>
          <div className={style.div_image_v}>
            <div className={style.image}>
              <IoMdDoneAll />
            </div>
          </div>
          <div className={style.content}>
            <span className={style.title}>Order validated</span>
            <p className={style.message}>
              Thank you for your purchase. you package will be delivered soon
              !!!
            </p>
          </div>
        </div>
      </div>
      <button
        className="btn btn-success w-25 d-block mx-auto"
        onClick={() => navigate("/")}
      >
        <FaHome />
        &nbsp; Home
      </button>
    </div>
  );
};

export default ThankYou;
