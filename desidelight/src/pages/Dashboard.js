import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { IoAnalytics, IoFastFoodOutline, IoRestaurant } from "react-icons/io5";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export const Dashboard = () => {
  const [result, setresult] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/dashboard/"
        );
        setresult(response.data);
      } catch (error) {
        console.log("Failed to load top foods");
      }
    };
    // 3FWUZWXBYRFDUPBDBSGZDTYZ  +12512903756 e97a17f66cfbdc25e0db32a5f4c0288f ACe347fbda9a0e85a95535315dfb7a8316
    fetch();
  }, []);
  return (
    <div>
      <div className={style.dashboard_side}>
        <ul>
          <li>
            <Link to="/basicinfo" className={style.dashboard_link}>
              <FaHome />
              &nbsp;Dashboard
            </Link>
          </li>
          <li>
            <Link to="/addfood" className={style.dashboard_link}>
              <IoFastFoodOutline />
              &nbsp;Add Food
            </Link>
          </li>
          <li>
            <Link to="/addrestaurant" className={style.dashboard_link}>
              <IoRestaurant />
              &nbsp;Add Restaurant
            </Link>
          </li>

          <li>
            <Link to="/toprater" className={style.dashboard_link}>
              <IoAnalytics />
              &nbsp;Reviews
            </Link>
          </li>
        </ul>
      </div>
      <button
        className={`btn btn-success ${style.hamburger}`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        <FaBars />
        &nbsp; Data
      </button>

      <div
        className={`offcanvas offcanvas-start `}
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className={style.dashboard_side2}>
            <ul>
              <li>
                <Link to="/basicinfo" className={style.dashboard_link}>
                  <FaHome />
                  &nbsp;Dashboard
                </Link>
              </li>
              <li>
                <Link to="/addfood" className={style.dashboard_link}>
                  <IoFastFoodOutline />
                  &nbsp;Add Food
                </Link>
              </li>
              <li>
                <Link to="/addrestaurant" className={style.dashboard_link}>
                  <IoRestaurant />
                  &nbsp;Add Restaurant
                </Link>
              </li>

              <li>
                <Link to="/toprater" className={style.dashboard_link}>
                  <IoAnalytics />
                  &nbsp;Reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
