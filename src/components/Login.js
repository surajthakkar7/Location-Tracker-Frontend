import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import useAuth hook

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const navigate = useNavigate(); // Hook for navigation
  const { setIsLoggedIn , setCurrentUser} = useAuth(); // Use useAuth hook to access isLoggedIn state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      setIsLoggedIn(true); // Update isLoggedIn state to true upon successful login
      setCurrentUser({ userId: response.data.userId, token: response.data.token }); // Set currentUser state with userId and token
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password. Please try again."); // Set error message for incorrect credentials
      } else {
        setErrorMessage("User Not Found"); // Set generic error message for other errors
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message if exists */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div>
        <p>Not a user? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
