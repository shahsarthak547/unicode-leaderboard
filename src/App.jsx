import React from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Leaderboard from "./components/Leaderboard.jsx";
import './index.css';
import './App.css';
const App = () => {
  return (
    <Routes>
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
};
export default App;