import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowCircleRight, FaEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../assets/bgcart.jpg";
import Spinner from "../components/Spinner";
const Profile = () => {
  const { email } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [editdata, setEditdata] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/${email}/`
        );
        setProfile(response.data);
        setEditdata(response.data);
      } catch (err) {
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    toast.success("Successfully logged out");
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditdata({ ...editdata, [name]: value });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(editdata);
    setLoading(false);
    axios
      .put(`http://localhost:8000/api/userupdate/${profile.id}/`, editdata)
      .then((response) => {
        toast.success("Profile updated successfully");
        setProfile(response.data);
        localStorage.setItem("userEmail", response.data.email);
        setEdit(false);
      })
      .catch((err) => {
        toast.error("Failed to update profile");
      });
  };

  const wait = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(handleEdit(e), 3000);
  };

  if (loading) {
    <div style={{ height: "100vh", display: "grid", placeContent: "center" }}>
      <Spinner />
    </div>;
  }

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.838)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <h4 className="text-success text-center">Profile</h4>
        <hr />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <strong className="my-2">
            Username: <span style={{ color: "green" }}>{profile.username}</span>
          </strong>
          <strong className="my-2">
            Email: <span style={{ color: "green" }}>{profile.email}</span>
          </strong>
          <strong className="my-2">
            Contact: <span style={{ color: "green" }}>{profile.mobile}</span>
          </strong>
          <strong className="my-2">
            Address: <span style={{ color: "green" }}>{profile.address}</span>
          </strong>
          <button
            className="btn btn-dark mt-3"
            onClick={() => navigate("/history")}
          >
            See Order history&nbsp;
            <FaArrowCircleRight />
          </button>
        </div>
        <div className="d-flex gap-3 justify-content-center">
          <button className="btn btn-success" onClick={() => setEdit(true)}>
            <FaEdit />
            &nbsp;Edit
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            <MdLogout />
            &nbsp;Logout
          </button>
        </div>
      </div>

      {/* Conditionally Render Edit Modal */}
      {edit && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "500px",
            }}
          >
            <h5>Edit Profile</h5>
            <form onSubmit={wait}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={editdata.email}
                  onChange={handleEditChange}
                  name="email"
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter Username"
                  value={editdata.username}
                  onChange={handleEditChange}
                  name="username"
                />
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter Address"
                  value={editdata.address}
                  onChange={handleEditChange}
                  name="address"
                />
                <label htmlFor="mobile">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  placeholder="Enter Contact"
                  value={editdata.mobile}
                  onChange={handleEditChange}
                  name="mobile"
                />
                <button className="btn btn-success mt-3" type="submit">
                  Update
                </button>
              </div>
            </form>
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setEdit(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
