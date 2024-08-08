// import React, { createContext, useEffect, useState } from "react";
// // import Ax from "./axiosInstance";
// import { jwt_decode } from "jwt-decode";
// import { Navigate } from "react-router-dom";
// import AxiosInstance from "./AxiosInstance";

// const AuthContext = createContext();

// export default AuthContext;

// export const AuthProvider = ({ children }) => {
//   const [authTokens, setAuthTokens] = useState(() =>
//     localStorage.getItem("authTokens")
//       ? JSON.parse(localStorage.getItem("authTokens"))
//       : null
//   );
//   const [user, setUser] = useState(() =>
//     localStorage.getItem("authTokens")
//       ? jwt_decode(localStorage.getItem("authTokens"))
//       : null
//   );
//   const history = Navigate();

//   const loginUser = async (e) => {
//     e.preventDefault();
//     const response = await AxiosInstance.post("token/", {
//       username: e.target.username.value,
//       password: e.target.password.value,
//     });
//     if (response.status === 200) {
//       setAuthTokens(response.data);
//       setUser(jwt_decode(response.data.access));
//       localStorage.setItem("authTokens", JSON.stringify(response.data));
//       history("/");
//     } else {
//       alert("Something went wrong!");
//     }
//   };

//   const registerUser = async (e) => {
//     e.preventDefault();
//     const response = await AxiosInstance.post("register/", {
//       username: e.target.username.value,
//       email: e.target.email.value,
//       password: e.target.password.value,
//     });
//     if (response.status === 201) {
//       history("/login");
//     } else {
//       alert("Something went wrong!");
//     }
//   };

//   const logoutUser = () => {
//     setAuthTokens(null);
//     setUser(null);
//     localStorage.removeItem("authTokens");
//     history("/login");
//   };

//   const contextData = {
//     user,
//     authTokens,
//     loginUser,
//     registerUser,
//     logoutUser,
//   };

//   useEffect(() => {
//     if (authTokens) {
//       setUser(jwt_decode(authTokens.access));
//     }
//   }, [authTokens]);

//   return (
//     <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
//   );
// };
