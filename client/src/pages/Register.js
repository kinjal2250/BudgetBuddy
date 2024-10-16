import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Layouts/Spinner"; // Assuming Spinner is your custom spinner component
import "./Register.css"
const API_URL="https://budgetbuddy-1-jhrm.onrender.com/api/v1";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      setLoading(true);
      // Send formData to backend API
      await axios.post(`${API_URL}/users/register`, formData);
      setLoading(false);
      alert("Registration successful"); // Replace message.success with an alert
      navigate("/login");
    } catch (error) {
      setLoading(false);
      alert("Invalid Username or Password"); // Replace message.error with an alert
    }
  };

//prevent for login user

return (
  <div className="container register-page">
    {loading} 
    <div className="register-form">
      <h1 className="text-center my-4">Register Here</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name" style={{ color: 'white' }}>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" style={{ color: 'white' }}>Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" style={{ color: 'white' }}>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <Link to="/login" className="text-primary">
          Already Registered? Click here to login
        </Link>
      </form>
    </div>
  </div>
);
};

export default Register;
