import React, { Component } from "react";
import { Link } from "react-router-dom";

export class HomeNav extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleLogin() {
    this.props.onLogin();
  }

  handleRegister() {
    this.props.onRegister();
  }

  render() {
    return (
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
                <Link to="/login" className="nav-link" onClick={this.handleLogin}>Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link" onClick={this.handleRegister}>Register</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    );
  }
}