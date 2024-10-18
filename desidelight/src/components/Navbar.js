import React, { useEffect, useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { FaCartFlatbed } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../pages/AuthContext";
import style from "./style.module.css";
const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
            src={logo}
            style={{
              height: "50px",
              width: "50px",
              mixBlendMode: "darken",
            }}
          />
          DesiDelight
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
              <Link
                className={`nav-link  ${style.navtext}`}
                aria-current="page"
                component={Link}
                to=""
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${style.navtext}`}
                component={Link}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${style.navtext}`}
                aria-disabled="true"
                component={Link}
                to="/admin"
              >
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${style.navtext}`}
                aria-disabled="true"
                component={Link}
                to="/explore"
              >
                Explore
              </Link>
            </li>
          </ul>
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <Link
                  className={`nav-link ${style.navtext}`}
                  aria-disabled="true"
                  component={Link}
                  to="/search"
                >
                  Search &nbsp; <FaSearch />
                </Link>
              </li>

              {useremail ? (
                <div className="d-flex">
                  <li className="nav-item">
                    <Link
                      to={`/cart/${useremail}`}
                      className={`nav-link ${style.navtext}`}
                    >
                      <FaCartFlatbed /> &nbsp;Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/profile/${useremail}`} className="nav-link">
                      <FaUser />
                    </Link>
                  </li>
                </div>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className={`nav-link ${style.navtext}`}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/register"
                      className={`nav-link ${style.navtext}`}
                    >
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
