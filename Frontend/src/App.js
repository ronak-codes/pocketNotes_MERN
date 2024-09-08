import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import HomePage from "./components/HomePage"

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" Component={SignUp} />
        <Route path="/signin" Component={SignIn}/>
        <Route path="/home" Component={HomePage}/>
      </Routes>
    </Router>
  );
};

export default App;
