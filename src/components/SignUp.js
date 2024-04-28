import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate(); // Use useNavigate hook to navigate

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
    brief: "",
    location: "", // Add location field to form data
    imageFile: null, // This will store the selected image file
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [useRandomLocation, setUseRandomLocation] = useState(true); // State to track whether to use random location or user-input coordinates

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
   // console.log("Selected file:", e.target.files[0]);
    setFormData({
      ...formData,
      imageFile: e.target.files[0], // Store the selected image file
    });
  };

  const generateRandomLocation = () => {
    const randomLocation = getRandomCoordinates();
    return `https://www.google.com/maps?q=${randomLocation}`;
  };

  const getRandomCoordinates = () => {
    // Generate random latitude and longitude within India's bounds
    const latitude = (Math.random() * (35.6745 - 6.7456) + 6.7456).toFixed(6); // Latitude range: 6.7456 to 35.6745 (India's latitude bounds)
    const longitude = (Math.random() * (97.3956 - 68.1622) + 68.1622).toFixed(
      6
    ); // Longitude range: 68.1622 to 97.3956 (India's longitude bounds)
    return `${latitude},${longitude}`;
  };

  useEffect(() => {
    setSubmittedData(formData);
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let location;
      if (useRandomLocation) {
        location = generateRandomLocation();
      } else {
        // Split user-entered coordinates into latitude and longitude
        const [latitude, longitude] = formData.location.split(",");
        location = `https://www.google.com/maps?q=${latitude.trim()},${longitude.trim()}`;

      }

      // Create a new FormData object
      const formDataToSend = new FormData();
      // Append form fields to the FormData object
      formDataToSend.append("image", formData.imageFile); // Append the image file
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("brief", formData.brief);
      formDataToSend.append("location", location); // Append the location

     
      for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }


      const response = await axios.post(
        "http://localhost:5000/api/signup",
        formDataToSend
      ); // Send form data

      console.log("Response:", response.data); // Log the response from the server

      setSubmittedData(formData);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
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
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
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
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brief" className="form-label">
            Brief
          </label>
          <textarea
            className="form-control"
            id="brief"
            name="brief"
            value={formData.brief}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="locationOption"
              id="randomLocation"
              value="random"
              checked={useRandomLocation}
              onChange={() => setUseRandomLocation(true)}
            />
            <label className="form-check-label" htmlFor="randomLocation">
              Use Random Location
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="locationOption"
              id="userLocation"
              value="user"
              checked={!useRandomLocation}
              onChange={() => setUseRandomLocation(false)}
            />
            <label className="form-check-label" htmlFor="userLocation">
              Enter Coordinates (latitude,longitude)
            </label>
          </div>
          {!useRandomLocation && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter coordinates (latitude, longitude) in decimal format (e.g., 37.7749, -122.4194)"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          )}
        </div>
        <label className="form-check-label" htmlFor="randomLocation">
          Choose Profile Picture{" "}
        </label>
        <input
          type="file"
          name="uploaded_file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {submittedData && (
        <div>
          <h2>Review Your Entered Data:</h2>
          <p>Full Name: {submittedData.fullName}</p>
          <p>Email: {submittedData.email}</p>
          <p>Password: {submittedData.password}</p>
          <p>Username: {submittedData.username}</p>
          <p>
            Location:{" "}
            <a
              href={
                useRandomLocation
                  ? generateRandomLocation()
                  : `https://www.google.com/maps?q=${formData.location}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {useRandomLocation ? "Random Location" : formData.location}
            </a>
          </p>
          <p>Brief: {submittedData.brief}</p>
        </div>
      )}
    </div>
  );
};

export default SignUp;
