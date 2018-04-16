import React from "react";
import RestaurantList from "../components/restaurants/RestaurantList.jsx";
import { withHistory, Link } from "react-router-dom";
import { HomeNav } from "../components/navs/HomeNav";
import { Filters } from "../components/Filters";
import { Session } from "meteor/session";
export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.search = this.search.bind(this);
  }

  handleClick() {
    fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA1hR7bNT1ZIhNGm1eHDGcXUPOB3bIMPo4", {
      method: "POST"
    }).then(r => r.json())
      .then(res => {
        var latitud = res.location.lat;
        var longitud = res.location.lng;
        var acc = res.accuracy;
        console.log(latitud);
        console.log(longitud);
        console.log(acc);
        Meteor.call("location.getStadium", latitud, longitud, acc, (err, res) => {
          if(err) {
            console.log(err);
          }
          else {
            if(res === "Estadio Nemésio Camacho El Campín") {
              document.getElementById("stadium-name").value = res;
              Session.set("Estadio", res);
              res = "Campin";
              Session.set("filtroEstadio", res);
            }
            else {
              console.log("stadium not found");
              alert("Stadium not found");
            }

          }
        });
      });
  }

  search() {
    var st = document.getElementById("stadium-name").value;
    let nom;
    console.log(st);
    if(st === "Estadio Nemésio Camacho El Campín") {
      st = "Campin";
      nom = "Estadio Nemésio Camacho El Campín";
    }
    else if(st === "Estadio Metropolitano de Techo") {
      st = "Techo";
      nom = "Estadio Metropolitano de Techo";
    }
    else if(st === "La Caneca") {
      st = "Caneca";
      nom = "La Caneca";
    }
    else {
      st = "All";
    }
    Session.set("Estadio", nom);
    Session.set("filtroEstadio", st);
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
                <h2 className="second-tittle">Search for the restaurants inside the nearest stadium
                </h2>
                <div className="form-stadium">
                  <div className="form-stad1">
                    <div className="form-stract">
                      <div className="form-group">
                        <input list="stadiums" id="stadium-name" className="form-control input-lg" placeholder="Stadium Name" />
                        <datalist id="stadiums">
                          <option value="Estadio Nemésio Camacho El Campín" />
                          <option value="Estadio Metropolitano de Techo" />
                          <option value="La Caneca" />
                          <option value="All stadiums" />
                        </datalist>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group2 text-center">
                            <button id="search-button" className="main-btn btn btn-success btn-sm btn-block" onClick={this.search}>Search for Stadium</button>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group2 text-center">
                            <button id="location-button" className="main-btn btn btn-success btn-sm btn-block" onClick={this.handleClick}>Locate Nearest Stadium</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container resta card">
          <div className="row contResti">
            <div className="container">
              <h1 className="main-tit">
                Restaurants
                            </h1>
            </div>
            <RestaurantList />
          </div>
        </div>


      </div>
    );

  }
}