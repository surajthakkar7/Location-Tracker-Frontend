import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { useAuth } from "./AuthContext"; // Import useAuth hook

const Navbar = () => {
  const handleLogout = () => {
    setIsLoggedIn(false); // Update isLoggedIn state to false when logging out
    localStorage.clear();
    // Redirect the user to the login page
    window.location.href = "/login";
  };
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Location Tracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {!isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {isLoggedIn && (
                        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </div>
        </nav>
    </div>
);
}

export default Navbar;
