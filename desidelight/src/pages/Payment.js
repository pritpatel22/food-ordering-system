import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { FaBackward, FaEdit } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Loader from "../components/Loader";

const Payment = () => {
  const [distance, setdistance] = useState([]);
  const [showform, setshowform] = useState(false);
  const [loading, showloading] = useState(true);
  const location = useLocation();
  const payment = location.state?.cart;
  const email = localStorage.getItem("userEmail");
  const total_amt = payment.total_amt;
  const navigate = useNavigate();
  const address = payment.items.map((item) => item.restaurant.address);

  const handleform = () => {
    setshowform(!showform);
  };

  const [user, setuser] = useState("");
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
    restaurant: address,
  };
  const handlechange = (e) => {
    setuser({ address: e.target.value });
  };
  const handleupdate = () => {
    setshowform(false);
  };
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse`,
              {
                params: {
                  lat: latitude,
                  lon: longitude,
                  format: "json",
                },
              }
            );
            const address = response.data.display_name;
            setuser({ address: address });
          } catch (error) {
            console.error("Error reverse geocoding:", error);
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/getdistance/`,
          {
            user: user.address,
            restaurant: address,
          }
        );
        setdistance(response.data.distance_km);
        showloading(false);
      } catch (error) {
        console.error(error);
        showloading(false);
      }
    };
    getUser();
  }, [user.address, payment.items]);
  // console.log(address);

  const pay = () => {
    const orderId = uuidv4();
    const orderDetails = {
      orderId,
      items: payment.items,
      address: user.address,
      totalAmount: total_amt,
    };

    navigate("/pay", { state: orderDetails });
  };

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
      <div className="d-flex gap-4">
        <button
          className="btn btn-success btn-sm mb-5"
          onClick={() => {
            // i want to go back by js
            window.history.back();
          }}
        >
          <FaBackward />
          &nbsp;&nbsp;BACK
        </button>
        <h5 className="text-secondary">Cart Summary</h5>
      </div>
      {payment ? (
        <table
          className="table w-100 p-5 table-lg"
          style={{ fontFamily: "sans-serif" }}
        >
          <thead>
            <tr className="p-3">
              <th className=" text-success font-large" scope="col">
                #
              </th>
              <th className=" text-success" scope="col">
                Restaurant
              </th>
              <th className=" text-success" scope="col">
                Food Item
              </th>
              <th className=" text-success" scope="col">
                Quantity
              </th>
              <th className=" text-success" scope="col">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {payment.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {item.food.restaurant_name + "   " + item.restaurant.address}
                </td>
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
          <div className="col-md-6">
            <div className="col-md-6 col-md-12 d-flex gap-5">
              <h5 className="text-secondary">
                Current Address :{" "}
                {user.address ? (
                  String(user.address).toLocaleUpperCase()
                ) : (
                  <></>
                )}
              </h5>
              <button className="btn btn-outline-success" onClick={handleform}>
                <FaEdit />
              </button>
            </div>

            {showform ? (
              <div
                className="col-md-12"
                style={{
                  backgroundColor: " rgba(17, 24, 39, 1)",
                  borderRadius: "20px",
                  padding: "15px",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                <form className="p-3 d-flex w-50 gap-3" onSubmit={handleupdate}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="NEW ADDRESS"
                    onChange={(e) => handlechange(e)}
                  />
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={handleUseCurrentLocation}
                  >
                    <FaLocationCrosshairs />{" "}
                  </button>
                  <button className="btn btn-success btn-sm ">
                    <TiTick />
                  </button>
                </form>
              </div>
            ) : (
              <></>
            )}

            <div className="col-md-12 d-flex gap-5 pt-2">
              <h5 className="text-secondary">
                {loading ? (
                  <Loader />
                ) : (
                  distance.map(({ restaurant_address, distance, duration }) => (
                    <p key={restaurant_address}>
                      Distance :{distance ? distance.toFixed(2) : <></>} 0KM
                      &nbsp;Duration : {duration ? duration.toFixed(2) : <></>}
                      Minute
                    </p>
                  ))
                )}
              </h5>
            </div>
          </div>
          <div
            className=" col-md-6 mb-4"
            style={{ display: "grid", placeContent: "end" }}
          >
            <button
              className="btn btn-success px-5 pt-3 pb-3 w-100"
              onClick={pay}
            >
              <BsCartCheckFill />
              &nbsp;Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
