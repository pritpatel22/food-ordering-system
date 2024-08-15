import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const [user, setuser] = useState("");
  const [distance, setdistance] = useState("");
  const [showform, setshowform] = useState(false);
  const location = useLocation();
  const payment = location.state?.cart;
  const email = localStorage.getItem("userEmail");
  const total_amt = payment.total_amt;
  const handleform = () => {
    setshowform(!showform);
  };
  // i want to display user data from api
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/${email}/`
        );
        setuser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);
  const data = {
    user: String(user.address),
    restaurant: String(payment.items[0].restaurant.address),
  };
  const handlechange = (e) => {
    const data = {
      user: String(e.target.value),
      restaurant: String(payment.items[0].restaurant.address),
    };
  };
  const handleupdate = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/getdistance/`,
        data
      );
      setdistance(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/getdistance/`,
          data
        );
        setdistance(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  return (
    <div
      className="container"
      style={{
        height: "100%",
        paddingTop: "210px",
        display: "block",
        placeContent: "center",
      }}
    >
      {payment ? (
        <table
          className="table w-100 p-5 table-lg"
          style={{ fontFamily: "sans-serif" }}
        >
          <thead>
            <tr className="p-3">
              <th scope="col">#</th>
              <th scope="col">Restaurant</th>
              <th scope="col">Food Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payment.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.restaurant.name}</td>
                <td>{item.food.name}</td>
                <td>{item.quantity}</td>
                <td>{item.get_total_item_price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="5"
                style={{ textAlign: "right", fontWeight: "bold" }}
              >
                Amount to Pay : {total_amt}
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div>
          <h1>no cart details found</h1>
        </div>
      )}
      <div className="w-100 container pt-5">
        <div className="row">
          <div className="col-md-12 d-flex gap-5">
            <h5 className="text-secondary">
              Current Address : {String(user.address).toLocaleUpperCase()}
            </h5>
            <button className="btn btn-outline-success" onClick={handleform}>
              <FaEdit />
            </button>
          </div>
          <div className="col-md-12">
            {showform ? (
              <form>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlechange}
                />
                <button className="btn btn-success" onClick={handleupdate}>
                  done
                </button>
              </form>
            ) : (
              <></>
            )}
          </div>
          <div className="col-md-12 d-flex gap-5">
            <h5 className="text-secondary">
              Distance :{" "}
              {distance.distance_km ? distance.distance_km.toFixed(2) : 0} KM
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
