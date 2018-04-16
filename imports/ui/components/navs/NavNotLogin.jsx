import React from "react";
import { withHistory, Link } from "react-router-dom";
export class NavNotLogin extends React.Component {

  login() {
    Meteor.logout((err) => {
      if(err) {
        console.log(err.reason);
      }
    });

  }
  register() {
    Meteor.logout((err) => {
      if(err) {
        console.log(err.reason);
      }
    });
  }

  render() {
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
                  <Link to="/" className="nav-link" >Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" onClick={this.login.bind(this)}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link" onClick={this.register.bind(this)}>Register</Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>

    );
  }
}