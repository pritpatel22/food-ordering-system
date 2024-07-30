import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./style.module.css";
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
      <div className={style.login_form}>
        <div className={style.form_container}>
          <p className={style.title}>Register</p>
          <form className={style.form} onSubmit={handlesubmit}>
            <div className={style.input_group}>
              <label for="email">username</label>
              <input
                type="text"
                id="username"
                placeholder="username"
                name="username"
                onChange={handlechange}
                value={formdata.username}
                required
              />
            </div>
            <div className={style.input_group}>
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder=""
                onChange={handlechange}
                value={formdata.email}
                required
              />
            </div>
            <div className={style.input_group}>
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="password"
                name="password"
                onChange={handlechange}
                value={formdata.password}
                required
              />
            </div>
            <div className={style.input_group}>
              <label for="re_password">re_password</label>
              <input
                type="password"
                name="re_password"
                id="re_password"
                placeholder=""
                onChange={handlechange}
                value={formdata.re_password}
                required
              />
            </div>
            <button
              className="btn btn-success d-block mx-auto w-100 mt-3"
              type="submit"
              onClick={handlesubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
      {/* <div className="container auth__container">
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
      </div> */}
    </>
  );
};
export default Register;
