import React from "react";
import RestaurantList from "../components/restaurants/RestaurantList.jsx";
import { withHistory, Link } from "react-router-dom";
export default class HomePage extends React.Component {
  login(e) {
    e.preventDefault();
    Meteor.logout((err) => {
      if(err) {
        console.log(err.reason);
      } else {
        this.props.history.push("/login");
      }
    });
    this.props.history.push("/login");

  }
  register(e) {
    e.preventDefault();
    Meteor.logout((err) => {
      if(err) {
        console.log(err.reason);
      } else {
        this.props.history.push("/signup");
      }
    });
    this.props.history.push("/signup");
  }
  render() {
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
                  <a className="nav-link" href="#" onClick={this.login.bind(this)}>Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.register.bind(this)}>Register</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <header className="jumbotron my-4">
            <h1 className="display-3">Welcome to Stadium Eats</h1>
            <p className="lead">Be Happy eating what you like, enjoying your sport event</p>
            <a href="#" className="btn btn-primary btn-lg" onClick={this.register.bind(this)} >Register Now!</a>
          </header>
        </div>
        <div className="container">
          <div className="container">
            <h1>
              Restaurants
          </h1>
          </div>
          <RestaurantList />
        </div>
      </div>
    );

  }
}