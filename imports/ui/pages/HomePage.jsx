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

        <nav className="navbar navbar-expand-md  navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Stadium Eats</a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav navbar-right">
              <a className="nav-item nav-link " href="#" onClick={this.login.bind(this)}>Login</a>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav navbar-right">
              <a className="nav-item nav-link " href="#" onClick={this.register.bind(this)}>Register</a>
            </div>
          </div>

        </nav>
        <div >
          <h1 className="t1">
            Welcome to Stadium Eats
          </h1>
          <h6 className="t2">
            With our service you can ejoy your event without hunger.
          </h6>
          <hr />
          <RestaurantList />
        </div>
      </div>
    );

  }
}