import React from "react";
import RestaurantList from "../components/restaurants/RestaurantList.jsx";
import { withHistory, Link } from "react-router-dom";
import { HomeNav } from "../components/navs/HomeNav";
export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }
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
        <HomeNav onLogin={this.login} onRegister={this.register} />

        <div className="header-1">
          <div className="page-header">
            <div className="filter"></div>
            <div className="content-center">
              <div className="container">
                <div className="row">
                  <div className="col-md-5">
                  </div>
                  <div className="col-md-6  ml-auto">
                    <h2 className="title">Travel with us</h2>
                    <h5 className="description">There's no doubt that Tesla is delighted with the interest, but the data also raises a few questions. How long will it take for Tesla to fulfill all those extra orders?</h5>
                    <br />

                  </div>
                </div>
              </div>
            </div>
          </div>
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