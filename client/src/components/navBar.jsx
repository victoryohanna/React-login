 import React, {Component} from 'react';
 import {Link} from 'react-router-dom';
 //import {isLoggedIn} from './userFunction'
 import '../styles/navbar.css'
 
 class NavBar extends Component {
     constructor(props){
         super(props);

         this.logout = this.logout.bind(this);
        //  this.login= this.login.bind(this)
     }

     logout(e){
         e.preventDefault();
         localStorage.removeItem('token');
     }

     render(){
         
         const loginLink = (
            <ul className="navbar-nav ml-auto">
                <li className="navbar-item">
                    <Link to="/login" 
                    className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/register" 
                    className="nav-link">Register</Link>
                </li>
            </ul>
         )
         //isLoggedIn()
         const userLink = (
            <ul className="navbar-nav ml-auto">
                <li className="navbar-item">
                    <Link className="nav-link" 
                    to="/profile">
                        User
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="nav-link"
                     to="/" onClick={this.logout}>
                         Logout
                    </Link>
                </li>
            </ul>
         )
         return(
            <div className="container">
                <nav className="navbar navbar-expand-lg ">
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/about-us" className="nav-link">About</Link>
                            </li>
                        </ul>

                        {localStorage.token ? userLink : loginLink}
                    </div>
                </nav>
            </div>
         )
     }
 }

 export default NavBar;