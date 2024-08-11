import axios from "axios"; // Ensure axios is imported
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./style.module.css";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
    mobile: "",
    address: "",
  });
  const { username, email, password, re_password, mobile, address } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== re_password) {
      toast.error("Passwords do not match");
    } else {
      try {
        // Direct registration function here
        await registerUser({ username, email, password, mobile, address });
        localStorage.setItem("userEmail", email);
        navigate(`/profile/${email}`);
      } catch (err) {
        toast.error(err.message || "Failed to register");
      }
    }
  };

  // Direct registration function defined within the component
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        userData
      );
      toast.success("success");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className={style.login_form}>
      <div className={style.form_container}>
        <p className={style.title}>Register</p>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.input_group}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={username}
              required
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={email}
              required
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={password}
              required
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="re_password">Confirm Password</label>
            <input
              type="password"
              name="re_password"
              id="re_password"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={re_password}
              required
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              placeholder="Mobile Number"
              onChange={handleChange}
              value={mobile}
              required
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              onChange={handleChange}
              value={address}
              required
            />
          </div>
          <button
            className="btn btn-success d-block mx-auto w-100 mt-3"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
