import React from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import style from "./style.module.css";
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  // const { user } = useSelector((state) => state.auth);
  const useremail = localStorage.getItem("userEmail");
  console.log(useremail);
  return (
    <nav className={`${style.navbar} navbar navbar-expand-lg  p-2 fixed-top`}>
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="/"
          style={{ fontFamily: "fantasy", color: "#264653" }}
        >
          &nbsp;&nbsp;
          <img
            src={
              "https://img.freepik.com/free-vector/hand-drawn-healthy-food-logo_23-2149651916.jpg?t=st=1721539898~exp=1721543498~hmac=be1b2527a29b646cc8110d0a44d546fcea27f88144de99c01bc6cc6e3f2736be&w=740"
            }
            style={{ height: "50px", width: "50px", mixBlendMode: "darken" }}
          />
          Happily Fresh
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link  ${style.navtext}`}
                aria-current="page"
                component={Link}
                to=""
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${style.navtext}`}
                component={Link}
                to="/about"
                href="/about"
              >
                About
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${style.navtext}`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Add Restaurants
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Manage restaurant
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${style.navtext}`}
                aria-disabled="true"
                component={Link}
                to="/explore"
                href="/explore"
              >
                Explore
              </a>
            </li>
          </ul>
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <a
                  className={`nav-link ${style.navtext}`}
                  aria-disabled="true"
                  component={Link}
                  to="/search"
                  href="/search"
                >
                  Search &nbsp; <FaSearch />
                </a>
              </li>

              {useremail ? (
                <div className="d-flex">
                  <li className="nav-item">
                    <Link to={`/profile/${useremail}`} className="nav-link">
                      <FaUser />
                    </Link>
                  </li>
                </div>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
