import axios from "axios";
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
      return;
    }
    if (password.length > 8) {
      toast.error("Password should be less than 8 characters");
      return;
    }
    if (/\s/.test(formData.username)) {
      toast.error("Username should not contain spaces");
    } else {
      let hasNumber = false;
      for (let i = 0; i < formData.username.length; i++) {
        if (/\d/.test(formData.username[i])) {
          hasNumber = true;
          break;
        }
      }
      if (!hasNumber) {
        toast.error("Username should contain at least one number");
      }
    }

    try {
      // Direct registration function here
      await registerUser({ username, email, password, mobile, address });
      localStorage.setItem("userEmail", email);
      navigate(`/profile/${email}`);
    } catch (err) {
      toast.error(err.message || "Failed to register");
    }
  };

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
    <div
      className={style.login_form}
      style={{
        backgroundImage: `url(${"https://img.freepik.com/premium-photo/fresh-vegetables-thin-crust-pizza-wooden-cutting-board_1160544-70594.jpg?w=1060"})`,
      }}
    >
      <div className={style.form_container}>
        <p className={style.title}>Register</p>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className="d-flex gap-2">
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
          </div>
          <div className="d-flex gap-2">
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
          </div>
          <div className="d-flex gap-2">
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
