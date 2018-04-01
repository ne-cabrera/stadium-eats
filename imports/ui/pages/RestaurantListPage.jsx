import React from "react";
import RestaurantList from "../components/restaurants/RestaurantList";

export default class RestaurantListPage extends React.Component {

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
                  <a className="nav-link" href="#" onClick={this.backHome.bind(this)}>Home</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div>
          <RestaurantList />
        </div>
      </div>

    );
  }
}