import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { useAuth } from "./AuthContext"; // Import useAuth hook

const Home = () => {
  const [userData, setUserData] = useState(null);
  const { isLoggedIn } = useAuth(); // Access isLoggedIn state

 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isLoggedIn) { // Check if user is logged in before fetching data
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:5000/api/users", {
            headers: { Authorization: token },
          });
         // console.log("users data : ", response.data);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isLoggedIn]); // Adding isLoggedIn as a dependency to useEffect
  
   // Function to handle user deletion and update user data state
   const handleDeleteUser = (userId) => {
    setUserData(userData.filter(user => user._id !== userId));
  };

  return (
    <div>
      <h1>Welcome to Location Tracker!</h1>
      {isLoggedIn ? (
        userData ? <UserCard userData={userData} onDeleteUser={handleDeleteUser} /> : <p>Loading...</p>
      ) : (
        <p>Please log in to view user data.</p>
      )}    </div>
  );
};

export default Home;
