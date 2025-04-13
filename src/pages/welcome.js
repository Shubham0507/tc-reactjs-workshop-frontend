import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="content">
        <h1>Welcome to the MERN Stack Workshop</h1>
        <button className="get-started-button" onClick={()=> navigate("/tasks")}>Get Started</button>
      </div>
      <footer className="footer">&copy; 2025 Shubham Singh. All rights reserved.</footer>
    </div>
  );
};

export default Welcome;