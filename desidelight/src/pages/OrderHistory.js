import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/CardCSS.css";

const OrderHistory = () => {
  const [data, setData] = useState([]);
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/orderhistory/${email}/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);
  if (data.length == 0) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div>
          <h5>No Order History Found</h5>
          <button
            className="btn btn-success d-block mx-auto"
            onClick={() => navigate("/explore")}
          >
            Explore Delights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 pt-5" style={{ height: "80vh", display: "grid" }}>
      <div className="container mt-2">
        <h4 className="text-centertext-success mb-4">Order History :-</h4>
        <div
          className="table-responsive"
          style={{
            borderRadius: "0.25rem",
            overflow: "hidden",
          }}
        >
          <table className="table  table-bordered p-4 table-hover table-sm">
            <thead className="table-success p-3">
              <tr>
                <th className="restaurant-name p-2 text-center">Food</th>
                <th className="restaurant-name p-2 text-center">Restaurant</th>
                <th className="restaurant-name p-2 text-center">Price</th>
                <th className="restaurant-name p-2 text-center">Quantity</th>
                <th className="restaurant-name p-2 text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="restaurant-name p-2 text-center">
                    {item.item_name}
                  </td>
                  <td className="restaurant-name p-2 text-center">
                    {item.restaurant_name}
                  </td>
                  <td className="restaurant-name p-2 text-center">
                    {item.price}/-
                  </td>
                  <td className="restaurant-name p-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="restaurant-name p-2 text-center">
                    {new Date(item.order_date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
