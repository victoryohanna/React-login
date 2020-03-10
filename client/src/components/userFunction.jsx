import React from 'react'
import {Link} from 'react-router-dom'
const isLoggedIn = ()=>{
    if(localStorage.userToken){
        return(
            <ul className="navbar-nav ml-auto">
                <li className="navbar-item">
                    <Link className="nav-link" 
                    to="/profile">
                        User
                    </Link>
                </li>
                <li className="navbar-item">
                    <a className="nav-link"
                     href="/" onClick={this.logout}>
                         Logout
                    </a>
                </li>
            </ul>
        )
    }
}
export default isLoggedIn;
