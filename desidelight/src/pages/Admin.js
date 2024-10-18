import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/2051346.jpg";

const Admin = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlelogin = () => {
    if (username === "admin1107" && password === "admin1107") {
      navigate("/basicinfo");
    } else {
      setError("Invalid username or password");
    }
  };
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          border: "2px solid green",
          padding: "40px",
          borderRadius: "20px",
          backgroundColor: "rgba(255,255,255,1)",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,1)",
        }}
      >
        <h5
          className="text-center text-success"
          style={{
            fontFamily: "cursive",
            letterSpacing: "2px",
            fontWeight: "bold",
          }}
        >
          ADMIN LOGIN
        </h5>
        <hr />
        <form>
          <label htmlFor="username" className="text-secondary p-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <br />
          <label htmlFor="password" className="p-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <br />
          <button
            className="btn btn-primary mx-auto d-block w-100"
            onClick={handlelogin}
          >
            Login
          </button>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Admin;
