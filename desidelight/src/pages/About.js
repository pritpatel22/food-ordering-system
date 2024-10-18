import React from "react";
import { FaHandPointRight } from "react-icons/fa";
import logo from "../assets/logo.png";
import "../components/Footer.css";

const About = () => {
  return (
    <section className="about-section mt-5">
      <div className="about-container">
        <div className="about-intro">
          <img src={logo} alt="Company Logo" className="about-logo" />
          <div>
            <h3 className="text-start text-success">
              <FaHandPointRight />
              &nbsp;About Us
            </h3>
            <p className="about-description">
              Welcome to <strong>Desi Delight</strong>, where passion for great
              food meets exceptional service. Our mission is to deliver the most
              delicious and carefully curated meals from top restaurants right
              to your doorsteps. We believe in quality, convenience, and
              community, bringing you a seamless food ordering experience you’ll
              love.
            </p>
          </div>
        </div>

        <div className="about-mission">
          <h3>
            <FaHandPointRight />
            &nbsp;Our Mission
          </h3>
          <p>
            At <strong>Your Brand</strong>, our mission is simple: to
            revolutionize the way people experience food. By connecting
            customers with their favorite restaurants, we’re creating a platform
            that celebrates culinary diversity while ensuring freshness and
            convenience.
          </p>
        </div>

        <div className="about-team">
          <h3>
            <FaHandPointRight />
            &nbsp;Meet Our Team
          </h3>
          <div className="team-grid">
            <div className="team-member">
              <img
                src=" https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-5.jpg?size=626&ext=jpg&ga=GA1.1.1525183143.1707571646&semt=ais_hybrid"
                alt="Team Member 1"
              />
              <h3>Bhuri</h3>
              <p>Founder & CEO</p>
              <p>
                Jane is the visionary behind <strong>Your Brand</strong>, with a
                passion for great food and customer-centric innovation.
              </p>
            </div>
            <div className="team-member">
              <img
                src="https://img.freepik.com/premium-vector/man-with-shirt-that-says-d-it_704913-37099.jpg?size=626&ext=jpg&ga=GA1.1.1525183143.1707571646&semt=ais_hybrid"
                alt="Team Member 2"
              />
              <h3>Yashraj</h3>
              <p>Chief Operating Officer</p>
              <p>
                John ensures the smooth operation of our delivery service,
                working tirelessly to improve our logistics.
              </p>
            </div>
            <div className="team-member">
              <img
                src="https://img.freepik.com/premium-vector/illustrations_995281-35700.jpg?size=626&ext=jpg&ga=GA1.1.1525183143.1707571646&semt=ais_hybrid"
                alt="Team Member 3"
              />
              <h3>Patel Rudra</h3>
              <p>Marketing Director</p>
              <p>
                Sarah is the mastermind behind our branding and marketing
                strategies, spreading the word about <strong>Your Brand</strong>{" "}
                far and wide.
              </p>
            </div>
          </div>
        </div>

        <div className="about-values">
          <h3>
            <FaHandPointRight />
            &nbsp;Our Core Values
          </h3>
          <ul>
            <li>
              <strong>Quality:</strong> Only the best food, sourced from
              top-rated restaurants.
            </li>
            <li>
              <strong>Community:</strong> We believe in giving back to the
              communities that support us.
            </li>
            <li>
              <strong>Innovation:</strong> Constantly improving our platform to
              make your food experience seamless.
            </li>
            <li>
              <strong>Customer-Centric:</strong> You are our top priority, and
              we are always here to serve you better.
            </li>
          </ul>
        </div>

        <div className="about-cta">
          <h3>
            <FaHandPointRight />
            &nbsp;Join Us on Our Journey
          </h3>
          <p className="text-white">
            Whether you’re a restaurant looking to partner with us or a customer
            seeking the best meals delivered to your door, we invite you to be a
            part of our story. Let’s create something amazing together!
          </p>
          <a href="/contact" className="cta-button">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
