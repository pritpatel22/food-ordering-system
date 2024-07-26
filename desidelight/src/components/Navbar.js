import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    // dispatch(logout());
    // dispatch(reset());
    // navigate("/");
  };
  // const { user } = useSelector((state) => state.auth);

  return (
    <nav className="navbar">
      <NavLink className="logo" to="/">
        Logo
      </NavLink>
      <ul className="nav-links">
        <NavLink className="nav-childs" to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className="nav-childs" to="/" onClick={handleLogout}>
          Logout
        </NavLink>

        <NavLink className="nav-childs" to="/dashboard">
          Dashboard
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
