import React, { Component } from "react";
import { withHistory } from "react-router-dom";
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






  render() {
    let currUsr = this.state.user;
    console.log(this.state.user);
    console.log(this.props.restaurants);
    return (
      <div>
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
                toMenus={this.toMenus.bind(this)}
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