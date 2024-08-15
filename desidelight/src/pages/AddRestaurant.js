import axios from "axios";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";
import { toast } from "react-toastify";
import Dashboard from "./Dashboard";
import style from "./style.module.css";

const AddRestaurant = () => {
  const [data, setdata] = useState({});
  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/addrestaurant/",
        data
      );
      console.log(res.data);
      toast.success(`${data.restaurant} Successfully Added`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ height: "100vh", paddingTop: "100px" }}>
      <div className="row">
        <div className="col-lg-3">
          <Dashboard />
        </div>
        <div className="col-lg-9">
          <div className={style.dashboard_content}>
            <div className={style.form_container} style={{ width: "100%" }}>
              <p className={`${style.title}`}>
                <FaPlusCircle />
                &nbsp; Add Restaurant
              </p>
              <form className={style.form} onSubmit={submit}>
                <div className="row">
                  <div className={`${style.input_group} col-sm-12`}>
                    <label htmlFor="food">Restaurant</label>
                    <input
                      type="text"
                      id="food"
                      placeholder="food"
                      name="restaurant"
                      onChange={handlechange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className={`${style.input_group} col-sm-12`}>
                    <label htmlFor="food">Address</label>
                    <input
                      type="text"
                      id="food"
                      placeholder="Address"
                      name="address"
                      onChange={handlechange}
                      required
                    />
                  </div>
                </div>
                <button
                  className="btn btn-success d-block mx-auto w-100 mt-3"
                  type="submit"
                >
                  ADD <IoRestaurant />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;
