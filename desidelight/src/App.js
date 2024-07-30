import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Activate from "./pages/Activate";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activate" element={<Activate />} />
          <Route path="/food/:id" element={<Details />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
