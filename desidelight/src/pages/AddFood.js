import axios from "axios";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import Dashboard from "./Dashboard";
import style from "./style.module.css";

const AddFood = () => {
  const [data, setdata] = useState({});
  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  //   #submit
  const submit = async (e) => {
    try {
      const res = await axios.post("http://localhost:8000/api/addfood/", data);
      console.log(res.data);
      toast.success(`${data.food} Successfully Added`);
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
                &nbsp; Add Food
              </p>
              <form className={style.form} onSubmit={submit}>
                <div className="row">
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="food"
                      placeholder="food"
                      name="food"
                      onChange={handlechange}
                      required
                    />
                  </div>
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="email">Description</label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="description"
                      onChange={handlechange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="password">Price</label>
                    <input
                      type="number"
                      id="price"
                      placeholder="Price"
                      name="price"
                      onChange={handlechange}
                      required
                    />
                  </div>
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="restaurant">Restaurant</label>
                    <input
                      type="text"
                      name="restaurant"
                      id="restaurant"
                      placeholder="Restaurant"
                      onChange={handlechange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="address">Category</label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      placeholder="Category"
                      onChange={handlechange}
                      className="p-3"
                      required
                    />
                  </div>
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="mobile">Photo</label>
                    <input
                      type="file"
                      name="image"
                      id="photo"
                      placeholder="Image"
                      accept=".jpg,.jpeg"
                      onChange={handlechange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className={`${style.input_group} col-sm-12`}>
                    <label htmlFor="mobile">Restaurant info</label>
                    <input
                      type="text"
                      name="info"
                      id="info"
                      className="p-4"
                      placeholder="Restaurant info"
                      onChange={handlechange}
                      required
                    />
                  </div>
                </div>

                {/* <div className="row">
                  <div className={`${style.input_group} col-sm-12`}>
                    <label htmlFor="mobile">Nutritions Info</label>
                    <input
                      type="text"
                      name="nutinfo"
                      id="nutinfo"
                      className="p-4"
                      placeholder="Nutritions info"
                    />
                  </div>
                </div> */}

                <button
                  className="btn btn-success d-block mx-auto w-100 mt-3"
                  type="submit"
                >
                  ADD <IoFastFoodSharp />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
