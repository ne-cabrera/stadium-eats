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
        this.props.history.push("/Home");
      }
    });
    this.props.history.push("/Home");

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
        this.props.history.push("/");
      }
    });
  }

  render() {
    const error = this.state.error;
    return (
      <div>
        <nav className="navbar navbar-expand-md  navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Stadium Eats</a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav navbar-right">
              <a className="nav-item nav-link " href="#" onClick={this.backHome.bind(this)}>Back Home</a>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="card card-container">
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