import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ResetPassword = () => {
  const [formdata, setformdata] = useState({
    email: "",
  });
  const { email } = formdata;
  function handlechange(e) {
    setformdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(formdata);
  }
  const handlesubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="container auth__container">
        <h1 className="main__title">
          ResetPassword <FaUser />
        </h1>
        <form className="auth__form" onSubmit={handlesubmit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handlechange}
            value={formdata.email}
            required
          />

          <button className="btn btn-primary">Register</button>
        </form>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
};
export default ResetPassword;
