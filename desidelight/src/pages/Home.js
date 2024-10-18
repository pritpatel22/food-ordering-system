import React, { useState } from "react";
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.jpg";
import Filter from "./Filter";
import Slider from "./Slider";
import style from "./style.module.css";

export const Home = () => {
  const email = localStorage.getItem("useEmail");
  const bg = [bg1, bg2, bg3, bg4];
  const [img, SetImg] = useState(2);

  return (
    <>
      <div
        className={style.login_form}
        style={{
          backgroundImage: `url(${bg[img]})`,
        }}
      >
        <div className={style.home__buttons}>
          <div style={{ color: "white" }}>
            <blockquote>
              <h1 className="main__title">DesiDelight</h1>
              <abbr
                style={{
                  color: "white",
                  display: "block",
                  textAlign: "center",
                }}
              >
                - Where every bite delights the soul -
              </abbr>
            </blockquote>
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {[0, 1, 2, 3].map((btn, index) => (
                <button
                  key={index}
                  className="btn"
                  style={{
                    backgroundColor: "rgba(255,2550,255,0.838)",
                    color: "black",
                    border: "none",
                    padding: "3px 10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={() => SetImg(btn)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <Slider />
      <br />
      <h5 className="container">Apply Filters !!!!</h5>
      <br />
      <Filter />
      <br />
    </>
  );
};

export default Home;
