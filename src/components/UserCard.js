import React from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import useAuth hook

const UserCard = ({ userData , onDeleteUser}) => {
  const { isLoggedIn ,currentUser } = useAuth(); // Use useAuth hook to access currentUser state
  // Function to handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      window.alert("User deleted successfully.");
      onDeleteUser(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1>All Users</h1>

      {userData.map((user, index) => {
        // Convert the array of integers to a Uint8Array
        const uint8Array = new Uint8Array(user.image.data);
        // Convert the Uint8Array to a Blob
        const blob = new Blob([uint8Array], { type: "image/jpeg" });
        // Convert the Blob to a Base64 string
        const imageUrl = URL.createObjectURL(blob);

       // Determine if the current user is an admin
       const isAdmin = currentUser && currentUser.userId === '662e427085f126d78fd03908'; 
        
        // Show delete button only for admin if logged in
        const showDeleteButton = isAdmin && isLoggedIn;

        
        return (
          <div className="card" style={{ width: "18rem" }} key={index}>
            {/* Displaying the image */}
            <img src={imageUrl} className="card-img-top" alt="User" />
            <div className="card-body">
              <h5 className="card-title">Full Name: {user.fullName}</h5>
              <p className="card-text">Brief: {user.brief}</p>
              <a
                href={user.location}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                View Location
              </a>
              {showDeleteButton && (
                <button onClick={() => handleDeleteUser(user._id)} 
                disabled={user._id === '662e427085f126d78fd03908'}
                className="btn btn-danger">
                  Delete User
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
