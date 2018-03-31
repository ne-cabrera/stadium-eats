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
      user: Meteor.user(),
      resturant: this.props.restaurants[0]
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


  toMenus(e) {
    console.log(this.props.restaurants[0], "El arreglo");
    console.log(this.props.restaurants[0].menu);
    e.preventDefault();
    Meteor.logout((err) => {
      if(err) {
        console.log(err.reason);
      } else {
        this.props.history.push({
          pathname: "/myMenu", state: {
            menus: this.state.restaurants[0].menu,
            name: this.props.restaurants[0].name,
            idRes: this.props.restaurants[0]._id,
          }
        });
      }
    });
    this.props.history.push({
      pathname: "/myMenu", state: {
        menus: this.props.restaurants[0].menu,
        name: this.props.restaurants[0].name,
        idRes: this.props.restaurants[0]._id,


      }
    });

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
                    <a href="#" className="nav-link" onClick={this.toMenus.bind(this)}> Menu</a>
                  </li>

                </ul>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav navbar-right">
                    <a className="nav-item nav-link " href="#" onClick={this.logout.bind(this)}>Logout</a>
                  </div>
                </div>
              </nav>
            </div> :
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
                    <Link className="nav-link" to="/restaurants"> Restaurants</Link>
                  </li>

                </ul>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav navbar-right">
                    <a className="nav-item nav-link " href="#" onClick={this.logout.bind(this)}>Logout</a>
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
                restaurant={this.state.restaurant}
                logout={this.logout.bind(this)}

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