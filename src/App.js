import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from './pages/welcome';
import TaskManager from './pages/tasks';
import './css/App.css'; // import the css file


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/get-started" element={<Welcome />} />
        <Route path="/tasks" element={<TaskManager />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;