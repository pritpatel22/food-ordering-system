import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
export const Home = () => {
  return (
    <>
      <div className={style.login_form}>
        <h1 className="main__title">DesiDelight</h1>
        <div className="home__buttons">
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};
export default Home;
