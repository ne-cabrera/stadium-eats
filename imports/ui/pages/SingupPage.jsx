import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  backHome(e) {
    e.preventDefault();
    Meteor.logout((err) => {
      if(err) {
        console.log(err.reason);
      } else {
        this.props.history.push("/");
      }
    });
    this.props.history.push("/");

  }

  handleSubmit(e) {
    e.preventDefault();
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    let phone = document.getElementById("signup-phone").value;
    let confPassword = document.getElementById("signup-confirm-password").value;
    console.log(name, email, password, phone);
    if(password !== confPassword) {
      this.setState({
        error: "Passwords don't match"
      });
      document.getElementById("signup-password").value = "";
      document.getElementById("signup-confirm-password").value = "";
    } else {

      Accounts.createUser({
        username: name,
        email: email,
        password: password,
        profile: {
          phone: phone,
          role: "client"
        }
      }, (err) => {
        if(err) {
          this.setState({
            error: err.reason
          });
        } else {
          this.props.history.push('/login');
        }
      });

    }


  }

  render() {
    const error = this.state.error;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">Stadium Eats</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.backHome.bind(this)}>Home</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="card card-container">
            <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" className="profile-name-card"></p>
            <form id="login-form" className="form col-md-12 center-block" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" id="signup-name" className="form-control input-lg" placeholder="Name" />
              </div>
              <div className="form-group">
                <input type="email" id="signup-email" className="form-control input-lg" placeholder="Email adress" />
              </div>
              <div className="form-group">
                <input type="number" id="signup-phone" className="form-control input-lg" placeholder="Phone number" />
              </div>
              <div className="form-group">
                <input type="password" id="signup-password" className="form-control input-lg" placeholder="Password" />
              </div>
              <div className="form-group">
                <input type="password" id="signup-confirm-password" className="form-control input-lg" placeholder="Confirm Password" />
              </div>

              <div className="form-group text-center">
                <input type="submit" id="login-button" className="btn btn-dark btn-lg btn-block" value="Register" />
              </div>
              <div className="form-group text-center">
                <p className="text-center">Do you have an account? Log in <Link to="/login">here</Link></p>
                <p className="text-center">Are you a Restaurant? Register <Link to="/signupRestaurant">here</Link> </p>
              </div>
            </form>
          </div>
        </div>
      </div >
    );
  }
}