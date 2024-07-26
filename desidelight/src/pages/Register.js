import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Register = () => {
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { username, email, password, re_password } = formdata;
  function handlechange(e) {
    setformdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(formdata);
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    if (password !== re_password) {
      // alert("password not match")
      toast.error("password not match");
    } else {
    }
  };
  return (
    <>
      <div className="container auth__container">
        <h1 className="main__title">
          Register <FaUser />
        </h1>
        <form className="auth__form" onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handlechange}
            value={formdata.username}
            required
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handlechange}
            value={formdata.email}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handlechange}
            value={formdata.username}
            required
          />
          <input
            type="password"
            placeholder="re_password"
            name="re_password"
            onChange={handlechange}
            value={formdata.re_password}
            required
          />
          <button className="btn btn-primary">Register</button>
        </form>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
};
export default Register;
