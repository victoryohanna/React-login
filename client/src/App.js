import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";


import NavBar from './components/navBar';
import HomeComponent from './components/home';
import SignupComponent from './components/registerForm';
import LoginComponent from './components/loginForm';
import ProfileComponent from './components/profile';



function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route exact path='/' component={LoginComponent} />
        <div className="container">
          <Route exact path='/home' component={HomeComponent} />
          <Route exact path = '/login' component = {LoginComponent} />
          <Route exact path = '/register' component = {SignupComponent} />
          <Route exact path = '/profile' component = {ProfileComponent} />
        </div>
      </Router>   
    </div>

  );

}

export default App;
