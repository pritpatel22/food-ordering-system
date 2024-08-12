import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCartPlus, FaEdit, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Cart from "./Cart";
import style from "./style.module.css";
const Profile = () => {
  const { email } = useParams(); // Get email from URL params
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/${email}/`
        );
        setProfile(response.data);
      } catch (err) {
        setError("Failed to fetch profile data");
      }
    };

    fetchProfile();
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    toast.success("Successfully logged out");
    navigate("/"); // Refresh page to update navbar
  };
  if (error) return <p>{error}</p>;

  return (
    <div className="row">
      <div className="col-sm-4">
        <div
          className={style.profile}
          style={{
            display: "grid",
            placeContent: "center",
            paddingTop: "100px",
          }}
        >
          {profile ? (
            <div className={style.Profilecard}>
              <div className={style.profile_bg}>
                <img src="https://wallpapercave.com/wp/wp6693935.jpg" />
              </div>
              <div className={style.avtar}>
                <img src="https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg" />
              </div>
              <div className={style.username}>
                <b>
                  <FaUserCircle />
                </b>
                &nbsp;&nbsp;
                {profile.username}
              </div>
              <div className={style.subtitle}>
                <b>Email :</b>
                {profile.email}
              </div>
              <div className={style.subtitle}>
                <b>Contact : </b>
                {profile.mobile}
              </div>
              <div className={style.subtitle}>
                <b>Address : </b>
                {profile.address}
              </div>
              <div
                className={style.wrapper}
                style={{ display: "flex", gap: "10px", paddingTop: "20px" }}
              >
                <button className="btn btn-success">
                  <FaEdit />
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  &nbsp;Logout
                </button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div
        className="col-sm-8"
        style={{
          marginTop: "100px",
          backgroundColor: "#f5f5f5",
          borderRadius: "20px",
          padding: "20px",

          height: "650px",
        }}
      >
        <div className="d-flex">
          <FaCartPlus className="mt-1" />
          &nbsp;
          <h5 className="text-center">
            <b>Your cart</b>
          </h5>
        </div>

        <Cart email={email} />
      </div>
    </div>
  );
};

export default Profile;
