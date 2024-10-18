import React from "react";
import { FaGooglePay } from "react-icons/fa";
import style from "../pages/style.module.css";
const Gpay = () => {
  return (
    <div>
      <div
        className=""
        style={{ display: "grid", placeContent: "center", paddingTop: "100px" }}
      >
        <div className={`${style.modal} p-3`}>
          <h3 className="text-center mt-3">
            <FaGooglePay
              style={{ fontSize: "50px", color: "green", textAlign: "center" }}
            />
          </h3>
          <form className={style.form}>
            <div className={style.credit_card_info_form}>
              <div className={style.input_container}>
                <label htmlFor="password_field" className={style.input_label}>
                  UPI ID
                </label>
                <input
                  id="password_field"
                  className={style.input_field}
                  type="text"
                  name="input-name"
                  title="Inpit title"
                  placeholder="ID"
                />
              </div>
            </div>
            <button className={style.purchase_btn}>PAY</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Gpay;
