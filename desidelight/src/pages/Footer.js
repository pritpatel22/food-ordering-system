import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import "../components/Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-column">
            <img src={logo} alt="Food Logo" className="footer-logo" />
            <p>Delicious food delivered at your doorstep!</p>
          </div>

          <div className="footer-column">
            <h4>About Us</h4>
            <p>We bring food from the best restaurants in your city.</p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/menu">Menu</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a target="_blank" href="https://facebook.com">
                <FaFacebook />
              </a>
              <a target="_blank" href="https://twitter.com">
                <FaTwitter />
              </a>
              <a target="_blank" href="https://instagram.com">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Contact Us</h4>
            <p>
              Email:&nbsp;
              <a href="" className="text-success">
                desidelight@gmail.com
              </a>{" "}
            </p>
            <p>Phone: +91 9313193747</p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <p>&copy; 2024 DesiDelight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
