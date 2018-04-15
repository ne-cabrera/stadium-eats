import React, { Component } from "react";
import { withHistory, Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import MainPage from "./pages/MainPage.jsx";
import MainPageRestaurant from "./pages/MainPageRestaurant.jsx";
import { Restaurantes } from "../api/restaurantes.jsx";
import { RestaurantAppNav } from "./components/navs/RestaurantAppNav";
import { ClientAppNav } from "./components/navs/ClientAppNav";
import { HeaderRestaurant } from "./components/HeaderRestaurant";
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

  // componentWillMount() {
  //     if(!this.state.isAuthenticated) {
  //         this.props.history.push("/Home");
  //     }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //     if(!this.state.isAuthenticated) {
  //         this.props.history.push("/Home");
  //     }
  // }


  logout() {
    Meteor.logout((err) => {
      if(err) {
        console.log(err.reason);
      }
    });
  }




  render() {
    let currUsr = this.state.user;
    console.log(this.state.user);
    console.log(this.props.restaurants);
    return (
      <div>
        <HeaderRestaurant />
        <div>
          {this.state.user.profile.role === "restaurant" ?
            (<RestaurantAppNav onClick={this.logout} />) :
            (<ClientAppNav onClick={this.logout} />)}
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