import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
export const Home = () => {
  return (
    <>
      <div className={style.login_form}>
        <div className={style.home__buttons}>
          <div>
            <blockquote>
              <h1 className="main__title mb-3">DesiDelight</h1>
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
          </div>
          <div className={`${style.btns} mt-4`}>
            <Link to="/login" className="btn btn-secondary w-25">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary w-25">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
