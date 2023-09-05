import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route name="/" exact path={ROUTES.HOME} element={<Home />}/>
        <Route name="Home" exact path={ROUTES.HOME} element={<Home />}/>
        <Route name="Login" exact path={ROUTES.LOGIN} element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
