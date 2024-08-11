import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Activate from "./pages/Activate";
import { AuthProvider } from "./pages/AuthContext";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Search from "./pages/Search";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
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
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:email" element={<Profile />} />
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
