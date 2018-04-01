import React, { Component } from "react";
import { withHistory, Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import MainPage from "./pages/MainPage.jsx";
import MainPageRestaurant from "./pages/MainPageRestaurant.jsx";
import { Restaurantes } from "../api/restaurantes.jsx";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = this.getMeteorData();
    this.logout = this.logout.bind(this);
  }

  getMeteorData() {
    sessionStorage.setItem("id", Meteor.userId());
    sessionStorage.setItem("username", Meteor.user().username);
    return {
      isAuthenticated: Meteor.userId() !== null,
      user: Meteor.user()
    };
  }

  componentWillMount() {
    if(!this.state.isAuthenticated) {
      this.props.history.push("/Home");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.state.isAuthenticated) {
      this.props.history.push("/Home");
    }
  }


  logout(e) {
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
    let currUsr = this.state.user;
    console.log(this.state.user);
    console.log(this.props.restaurants);
    return (
      <div>
        <div>
          {this.state.user.profile.role === "restaurant" ?
            <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                  <a className="navbar-brand" href="#">Stadium Eats</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item ">
                        <a className="nav-link" href="#">Home
                  </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#" >Orders</a>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/myMenu"> Menu</Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#" onClick={this.logout.bind(this)}>Logout</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div> :
            <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                  <a className="navbar-brand" href="#">Stadium Eats</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item ">
                        <a className="nav-link" href="#">Home</a>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/restaurants"> Restaurants</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/myOrders"> Orders</Link>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="#" onClick={this.logout.bind(this)}>Logout</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

            </div>}
        </div>
        <div>
          {
            this.state.user.profile.role === "client" ?
              <MainPage
                currentUser={this.state.user.username}
                logout={this.logout.bind(this)} /> :
              <MainPageRestaurant
                currentUser={this.state.user.username}
              />
          }
        </div>

      </div>

    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("restaurantes");
  console.log(Meteor.userId());
  return {

    restaurants: Restaurantes.find({ owner: Meteor.userId() }).fetch(),
    currentUser: Meteor.user()
  };
})(App);