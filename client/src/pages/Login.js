import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Layouts/Spinner"; // Assuming Spinner is your custom spinner component
import './Login.css';
const API_URL="https://budgetbuddy-1-jhrm.onrender.com/api/v1";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
      // Send formData to backend API for login
      const { data } = await axios.post(`${API_URL}/users/login`, formData);
      setLoading(false);
      alert("Login successful");

      // Storing user data in localStorage (omit password for security)
      localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));

      // Navigate to HomePage.js (root "/")
      navigate("/"); 
    } catch (error) {
      setLoading(false);
      alert("Invalid Email or Password"); // Handle login error
    }
  };

  return (
    <div className="container login-page">
      {/* Center the spinner */}
      {/* {loading && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )} */}
      <div className="login-form">
        <h1 className="text-center my-4">Login Here</h1>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
          <Link to="/register" className="text-primary linkclass">
            Not a user? Click here to register
          </Link>
        </form>
      </div>
    </div>
  );  
};

export default Login;
