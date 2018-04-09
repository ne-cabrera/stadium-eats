import React, { Component } from "react";
import { withHistory, Link } from "react-router-dom";
import { createContainer } from "meteor/react-meteor-data";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
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
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    Meteor.loginWithPassword(email, password, (err) => {
      if(err) {
        this.setState({
          error: err.reason
        });
      } else {
        this.props.history.push("/Home");
      }
    });
  }

  alert() {
    if(this.state.error === "") {
      return ("");
    } else if(this.state.error !== "") {
      return (
        <div class="alert alert-danger" role="alert">
          {this.state.error}
        </div>
      );
    } else if(this.props.location.state.message !== "") {
      <div class="alert alert-success" role="alert">
        This is a success alert—check it out!
      </div>
    } else {
      return ("");
    }
  }

  render() {
    const error = this.state.error;
    return (
      <div>

        <nav className="navbar navbar-expand-lg fixed-top nav-down" >
          <div className="container">
            <div className="navbar-translate">
              <div className="navbar-header">
                <a href="" className="navbar-brand">Stadium Eats</a>
              </div>
              <button class="navbar-toggler navbar-burger" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.backHome.bind(this)}>Home</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="padUp">
            <h1>
              Please Login
          </h1>
          </div>

          <div className="card card-container">
            {this.alert()}
            <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" className="profile-name-card"></p>
            <form id="login-form" className="form col-md-12 center-block" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="email" id="login-email" className="form-control input-lg" placeholder="email" />
              </div>
              <div className="form-group">
                <input type="password" id="login-password" className="form-control input-lg" placeholder="password" />
              </div>
              <div className="form-group text-center">
                <input type="submit" id="login-button" className="btn btn-dark btn-lg btn-block" value="Login" />
              </div>
              <div className="form-group text-center">
                <p className="text-center">Don't have an account? Register <Link to="/signup">here</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}