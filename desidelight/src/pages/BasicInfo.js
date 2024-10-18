import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingBag, FaUsers } from "react-icons/fa";
import { IoRestaurantSharp } from "react-icons/io5";
import { MdFastfood, MdMessage } from "react-icons/md";
import Dashboard from "./Dashboard";
import style from "./style.module.css";
const BasicInfo = () => {
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
    <div style={{ height: "100vh", paddingTop: "100px" }}>
      <div className="row">
        <div className="col-lg-3">
          <Dashboard />
        </div>
        <div className="col-lg-9">
          <div className={style.dashboard_content}>
            <div className="row">
              <div className="col-lg-4">
                <div className={style.totaluser}>
                  <div style={{ display: "grid", placeContent: "center" }}>
                    <h1 className="text-center text-success">
                      <FaUsers style={{ textAlign: "center" }} />
                      <h5>Users</h5>
                    </h1>
                    <h1 style={{ fontFamily: "fantasy", letterSpacing: "5px" }}>
                      {result.users}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-1">
                <div className={style.totaluser}>
                  <div style={{ display: "grid", placeContent: "center" }}>
                    <h1 className="text-center text-success">
                      <IoRestaurantSharp style={{ textAlign: "center" }} />
                      <h5>Restaurant</h5>
                    </h1>
                    <h1
                      style={{
                        fontFamily: "fantasy",
                        letterSpacing: "5px",
                        textAlign: "center",
                      }}
                    >
                      {result.restaurants}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-1">
                <div className={style.totaluser}>
                  <div style={{ display: "grid", placeContent: "center" }}>
                    <h1 className="text-center text-success">
                      <FaShoppingBag style={{ textAlign: "center" }} />
                      <h5>Orders</h5>
                    </h1>
                    <h1
                      style={{
                        fontFamily: "fantasy",
                        letterSpacing: "5px",
                        textAlign: "center",
                      }}
                    >
                      {result.restaurants}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-4">
                <div className={style.totaluser}>
                  <div style={{ display: "grid", placeContent: "center" }}>
                    <h1 className="text-center text-success">
                      <MdFastfood style={{ textAlign: "center" }} />
                      <h5>Best Food</h5>
                    </h1>
                    <h2
                      style={{
                        fontFamily: "fantasy",
                        letterSpacing: "5px",
                        textAlign: "center",
                      }}
                    >
                      {result.topfood}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-1">
                <div className={style.totaluser}>
                  <div style={{ display: "grid", placeContent: "center" }}>
                    <h1 className="text-center text-success">
                      <FaShoppingBag style={{ textAlign: "center" }} />
                      <h5>Best Restaurant</h5>
                    </h1>
                    <h2
                      style={{
                        fontFamily: "fantasy",
                        letterSpacing: "5px",
                        textAlign: "center",
                      }}
                    >
                      {result.toprest}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-1">
                <div className={style.totaluser}>
                  <div style={{ display: "grid", placeContent: "center" }}>
                    <h1 className="text-center text-success">
                      <MdMessage style={{ textAlign: "center" }} />
                      <h5>Total Reviews</h5>
                    </h1>
                    <h2
                      style={{
                        fontFamily: "fantasy",
                        letterSpacing: "5px",
                        textAlign: "center",
                      }}
                    >
                      {result.review}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
