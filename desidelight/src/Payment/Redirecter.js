import React from "react";
import style from "../pages/style.module.css";

const Redirecter = () => {
  return (
    <div className={style.loader}>
      <label>Redirecting...</label>
      <div className={style.loading}></div>
    </div>
  );
};

export default Redirecter;
