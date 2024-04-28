import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider


const App = () => {
  return (
    <AuthProvider>
    <div>
    <Router>
        <Navbar />
        <div className="container">
          <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          </Routes>
      </div>

    </Router>
    </div>
    </AuthProvider>

);
};

export default App;
