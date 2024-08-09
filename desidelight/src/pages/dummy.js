import React from "react";
import style from "./style.module.css";
const Dummy = () => {
  return (
    <>
      <div className="row p-3 m-2">
        <div className="col-sm-4">
          <div className="card">
            <div
              className="card-header"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <h5 className="card-title">By Restaurant name : </h5>
                star - avg rating
              </div>
              <div>
                <button className="btn btn-light">--</button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <h4>Food item</h4>
                  <h4>price</h4>
                  <button className="btn btn-outline-dark">get details</button>
                </div>
                <div className="col-sm-6">
                  <div>
                    <img
                      src="https://www.bing.com/th?id=OIP.SaY9Qa9OIDsWDgvD_Gp0mQHaLH&w=146&h=219&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                      alt="food item"
                      className={style.foodimage}
                    />
                    <button>Add food</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dummy;
