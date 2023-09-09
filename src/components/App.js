import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/Login" element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
