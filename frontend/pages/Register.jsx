import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    adress: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      login(res.data.token, res.data.user);
      setMessage("Registration successful!");
      navigate("/dashBoard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2 className="form-heading">Register</h2>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
        minLength={2}
        maxLength={30}
        className="form-input"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
        minLength={2}
        maxLength={30}
        className="form-input"
      />
      <input
        type="text"
        name="adress"
        placeholder="Address"
        value={formData.adress}
        onChange={handleChange}
        required
        minLength={5}
        maxLength={100}
        className="form-input"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        className="form-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={6}
        className="form-input"
      />

      <button type="submit" className="form-submit-button">
        Register
      </button>

      {/* Feedback messages */}
      {message && <p className="form-feedback-message success">{message}</p>}
      {error && <p className="form-feedback-message error">{error}</p>}
    </form>
  );
}
