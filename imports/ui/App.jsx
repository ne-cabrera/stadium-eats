import React, { Component } from "react";
import { withHistory } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import MainPage from "./pages/MainPage.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = this.getMeteorData();
    this.logout = this.logout.bind(this);
  }

  getMeteorData() {
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
        this.props.history.push("/login");
      }
    });
    this.props.history.push("/login");
  }
  renderClientsNav() {
    return (
      <div>
        <nav className="navbar navbar-expand-md  navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Stadium Eats</a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav ml-auto">

            <li className="nav-item">
              <a href="#" className="nav-link">Home</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="#"> Orders </a>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link"> Restaurants</a>
            </li>

          </ul>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav navbar-right">
              <a className="nav-item nav-link " href="#" onClick={this.logout}>Logout</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  renderRestaurantNavBar() {
    return (
      <div>
        <nav className="navbar navbar-expand-md  navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Stadium Eats</a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav ml-auto">

            <li className="nav-item">
              <a href="#" className="nav-link">Home</a>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link"> Succesful</a>
            </li>

            <li class="nav-item ">
              <a class="nav-link" href="#"> Orders </a>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link"> Menu</a>
            </li>

          </ul>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav navbar-right">
              <a className="nav-item nav-link " href="#" onClick={this.logout}>Logout</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  render() {
    let currUsr = this.state.user;
    return (

      <div>
        <div>
          {this.state.user.profile.role === "client" ? this.renderClientsNav() : this.renderRestaurantNavBar()}
        </div>
        <div>
          <MainPage currentUser={this.state.user.username} />
        </div>

      </div>

    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(App);