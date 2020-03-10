import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";

const url = "http://localhost:4000";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
 
const validateForm = (errors)=>{
    let valid = true;
    Object.values(errors).forEach(
        (val)=> val.length > 0 && (valid = false)
    );
    return valid;
}

class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",

      errors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      formInvalid : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  handleChange(e) {
    //e.preventDefault();
    const { name, value } = e.target;
    let err = this.state.errors;

    switch (name) {
      case "email":
        err.email = validEmailRegex.test(value)
          ? ""
          : "Please enter valid email";
        break;
      case "password":
        err.password = value.length < 8 
        ? "Password must be atleat 8 characters" : "";
        break;
      default:
        break;
    }

    if (this.state.confirmPassword.length === this.state.password.length-1 ) {
        err.confirmPassword = "";
      } else {
        err.confirmPassword = "Password not matched";
      }
      
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    //Check form fields status to make sure is not empty
    let err = this.state.errors;

    if(this.state.firstName === ''){
      err.firstName = 'First Name required'
    }

    if(this.state.lastName ===''){
      err.lastName = 'Last Name required'
    }

    if(this.state.email === ''){
      err.email = 'Email required'
    }
    if(this.state.password ===''){
      err.password = 'Pasword required'
    }

    if(validateForm(this.state.errors)){

      //create instance of user model
      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password 
      };
     //send http call to backend
      axios.post(url + "/register", user).then(res => {
        console.log(res.data);
        this.props.history.push("/home");
      });
      //reset form
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    }else{
        //send validation notification
        this.setState({
          formInvalid : 'Please fill correct values in form fields'
        });
    }
  }
  render() {
    const {errors } = this.state;
    return (
      <div className="container body-register">
        <div className="row">
          <div className="col-md-10 offset=md-1">
            <div className="row">
              <div className="col-md-5 register-left">
                <h3>Sign up</h3>
                <p>Create account with us to have full access</p>
                <button type="button" className="btn btn-primary">
                  <Link to="/">About us</Link>
                </button>
              </div>
              <div className="col-md-7 register-right">
                <form
                  className="register-form"
                  onSubmit={this.handleSubmit}
                  noValidate
                >
                  <h2 className="text-center mt-3 register-signup">Register</h2>
                  <h5 className="text-center">
                  <span className="error">{this.state.formInvalid}</span>
                  </h5>  
                  <div className="row">
                    <div className="col-md-12 mx-auto">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="firstName"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                          noValidate
                        />
                        {errors.firstName.length > 0 && (
                          <span className="error">{errors.firstName}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12 mx-auto">
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          id="lastName"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                          noValidate
                        />
                        {errors.lastName.length > 0 && (
                          <span className="error">{errors.lastName}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12 mx-auto">
                      <div className="form-group">
                        <label htmlFor="email">Email </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          noValidate
                        />
                        {errors.email.length > 0 && (
                          <span className="error">{errors.email}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12 mx-auto">
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          noValidate
                        />
                        {errors.password.length > 0 && (
                          <span className="error">{errors.password}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12 mx-auto">
                      <div className="form-group">
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          onChange={this.handleChange}
                          noValidate
                        />
                        {errors.confirmPassword.length > 0 && (
                          <span className="error">
                            {errors.confirmPassword}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupComponent;
