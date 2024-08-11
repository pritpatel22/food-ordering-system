import React from "react";
import style from "./style.module.css";
const Footer = () => {
  return (
    <div className={`${style.Footer}`}>
      <div className={style.about}>
        <ol>
          <li>
            <p className={style.heading}>DesiDelight</p>
          </li>
          <li>
            <p className={style.info}>© 2024 Bundl Technologies Pvt. Ltd</p>
          </li>
        </ol>
      </div>
      <div className={style.Company}>
        <ol>
          <li>
            <p className={style.heading}>Company</p>
          </li>
          <li>
            <p className={style.info}>About</p>
          </li>
          <li>
            <p className={style.info}>Careers</p>
          </li>
          <li>
            <p className={style.info}>Team</p>
          </li>
        </ol>
      </div>
      <div className={style.Contact_Us}>
        <ol>
          <li>
            <p className={style.heading}>Contact us</p>
          </li>
          <li>
            <p className={style.info}>Help & Support</p>
          </li>
          <li>
            <p className={style.info}>Partner with us</p>
          </li>
          <li>
            <p className={style.info}>Ride with us</p>
          </li>
        </ol>
      </div>
      <div className={style.Legal}>
        <ol>
          <li className={style.heading}>
            <p>Terms & Conditions</p>
          </li>
          <li className={style.info}>
            <p>Cookie Policy</p>
          </li>
          <li className={style.info}>
            <p>Privacy Policy</p>
          </li>
          <li className={style.info}>
            <p>Investor Relations</p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Footer;
