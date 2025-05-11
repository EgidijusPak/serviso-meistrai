import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/HomePage";
import Dashboard from "../pages/Dashboards";
import { AddWorker } from "../pages/AddWorker";
import ShowWorkers from "../pages/ShowAllWorkers";
import LikedWorkers from "../pages/LikedWorkers";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./app.css";
function App() {
  return (
    <div className="app-container">
      <Router>
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/add-worker" element={<AddWorker />} />
            <Route path="/admin/show-workers" element={<ShowWorkers />} />
            <Route path="/liked-workers?" element={<LikedWorkers />} />
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
