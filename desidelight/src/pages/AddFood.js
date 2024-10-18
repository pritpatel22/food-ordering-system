import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import Dashboard from "./Dashboard";
import style from "./style.module.css";

const AddFood = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [data, setData] = useState({
    food: "",
    description: "",
    price: "",
    restaurant: "",
    category: "",
    info: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    // Fetch the list of restaurants
    axios
      .get("http://localhost:8000/api/restaurants/")
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants", error);
      });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/addfood/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      toast.success(`${data.food} Successfully Added`);
    } catch (error) {
      toast.error("Food item not added");
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
              <form
                className={style.form}
                encType="multipart/form-data"
                onSubmit={submit}
              >
                <div className="row">
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="food">Food</label>
                    <input
                      type="text"
                      id="food"
                      name="food"
                      placeholder="Food"
                      value={data.food}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Description"
                      value={data.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Price"
                      value={data.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="restaurant">Restaurant</label>
                    <select
                      className="form-select"
                      id="restaurant"
                      name="restaurant"
                      value={data.restaurant}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Restaurant</option>
                      {restaurants.map((restaurant) => (
                        <option key={restaurant.id} value={restaurant.id}>
                          {restaurant}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      placeholder="Category"
                      value={data.category}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={`${style.input_group} col-sm-6`}>
                    <label htmlFor="image">Photo</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className={`${style.input_group} col-sm-12`}>
                    <label htmlFor="info">Restaurant Info</label>
                    <input
                      type="text"
                      id="info"
                      name="info"
                      placeholder="Restaurant Info"
                      value={data.info}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

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
