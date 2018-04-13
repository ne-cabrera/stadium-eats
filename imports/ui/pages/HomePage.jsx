import React from "react";
import RestaurantList from "../components/restaurants/RestaurantList.jsx";
import { withHistory, Link } from "react-router-dom";
import { HomeNav } from "../components/navs/HomeNav";
import { Filters } from "../components/Filters";
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
        <div className="page-header">
          <div className="filter"></div>
          <div className="content-center">
            <div className="container">
              <div className="stadium-form-component">
                <h1 className="main-tittle">Order food inside any stadium in the country</h1>
                <h2 className="second-tittle">Search for the restaurants inside the nearest stadium</h2>
                <div className="form-stadium">
                  <form className="form-stad1">
                    <div className="form-stract">
                      <div className="form-group">
                        <input type="text" id="signup-name" className="form-control input-lg" placeholder="Stadium Name" />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group2 text-center">
                            <input type="submit" id="search-button" className="main-btn btn btn-success btn-sm btn-block" value="Search for Stadium" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group2 text-center">
                            <input type="submit" id="location-button" className="main-btn btn btn-success btn-sm btn-block" value="Locate Nearest Stadium" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container resta">
          <div className="row">
            <div className="col-md-2">
              <Filters />
            </div>
            <div className=" col-md-8 container">
              <div className="container">
                <h1>
                  Restaurants
                        </h1>
              </div>
              <RestaurantList />
            </div>
          </div>

        </div>

      </div>
    );

  }
}