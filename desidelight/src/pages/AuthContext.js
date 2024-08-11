import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/login/", { email, password });
      localStorage.setItem("token", response.data.access);
      setUser({ email });
      navigate("/profile");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Failed to login:", error);
      throw error;
    }
  };

  const register = async (username, email, password, mobile, address) => {
    try {
      const response = await axios.post("/api/register/", {
        username,
        email,
        password,
        mobile,
        address,
      });
      return response.data;
      navigate("/login");
    } catch (error) {
      console.error("Failed to register:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      toast.error("Failed to fetch user profile.");
      throw error;
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, fetchUserProfile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
