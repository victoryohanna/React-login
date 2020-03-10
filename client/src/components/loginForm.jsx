import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import '../styles/login.css';
const url = "http://localhost:4000";

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : ''  
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    isAuthenticated(){
        const token = localStorage.getItem('token');
       if(token && token.length > 10){
        return true
       }else{
        return false
       }
         //return token && token.length > 10;
    }

    handleSubmit(e){  
        e.preventDefault();
        const login = {
            email : this.state.email,
            password : this.state.password 
        };
        axios.post(url + '/login', login).then(
            res=>{ 
                console.log(res.data)
                if(res.data){
                    let token = res.data
                    localStorage.setItem('token',  token); 
                    this.setState()
                    // console.log(localStorage)       
                    //  this.props.history.push('/profile');                  
                }else{
                    console.log('Invalid Username or password');
                }
            }
        ).catch(err=>{
            console.log(err);
        })
        this.setState({
            email : '',
            password : ''
        })
    }
    render(){
        const authenticated = this.isAuthenticated()
        return (
            <div className="container body-login">
                {authenticated ? <Redirect to={{pathname : '/profile'}} /> : (
                    <div className="row">
                        <div className="col-md-10 offset=md-1">
                            <div className="row">
                                <div className="col-md-5 login-left">
                                <h3>Sign up</h3>
                                <p>Create account with us to have full access</p>
                                <button type="button" className="btn btn-primary"><Link to ="/register">Creat Accout</Link></button>
                                </div>
                                <div className="col-md-7 login-right">
                                <form className="register-form" onSubmit = {this.handleSubmit} >
                                    <h2 className="text-center mt-3 register-login">Login</h2>
                                    <div className='row'>                               
                                        <div className="col-md-12 mx-auto">
                                            <div className="form-group">
                                                <label htmlFor="email">Email </label>
                                                <input  type="text" 
                                                        className="form-control" 
                                                        name="email" 
                                                        value = {this.state.email}
                                                        onChange = {this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mx-auto">
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input  type="password" 
                                                        className="form-control" 
                                                        name="password"
                                                        value = {this.state.password}
                                                        onChange = {this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <a href="/profile"><button type="submit" 
                                                className="btn btn-primary"
                                                > Submit</button></a>
                                    </div>
                                </form> 
                                </div>
                            </div>
                        </div>
                    </div> 
                )}
            </div>
        )
    }
}



export default LoginComponent;