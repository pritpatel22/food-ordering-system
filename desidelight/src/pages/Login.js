import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import style from "./style.module.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("userEmail", email);
      navigate(`/profile/${email}`); // Redirect to profile or home after login
    } catch (err) {
      setError("Invalid credentials");
    }
  };
  const loginUser = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        credentials
      );
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("userEmail", email);
      toast.success("success");
      navigate(`/profile/${String(email)}`);
    } catch (error) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className={style.login_form}>
      <div className={style.form_container}>
        <p className={style.title}>Login</p>
        {error && <p className={style.error}>{error}</p>}{" "}
        {/* Display error if any */}
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.input_group}>
            <label htmlFor="username">Email</label>
            <input
              type="email"
              name="email"
              id="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={style.forgot}>
              <a href="/resetpassword">Forgot Password ?</a>
            </div>
          </div>
          <button
            className="btn btn-success d-block mx-auto w-100"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
