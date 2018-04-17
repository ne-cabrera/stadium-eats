import React from "react";
import { Session } from "meteor/session";

export class HeaderLocation extends React.Component {

//Seria bueno quitar/achicar la barra de busqueda grande cuando se realiza la búsqueda. En pantallas pequeñas casi
  //no se nota la actualización de datos segun el estadio 
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
            }
          }
        });
      });
  }
  
  search() {
    var st = document.getElementById("stadium-name").value;
    console.log(st);
    if(st === "Estadio Nemésio Camacho El Campín") {
      Session.set("Estadio", st);
      st = "Campin";
    }
    else if(st === "Estadio Metropolitano de Techo") {
      Session.set("Estadio", st);
      st = "Techo";
    }
    else if(st === "La Caneca") {
      Session.set("Estadio", st);
      st = "Caneca";
    }
    else {
      st = "All";
    }

    Session.set("filtroEstadio", st);
  }

  render() {
    return (
      <div className="page-header">
        <div className="filter"></div>
        <div className="content-center">
          <div className="container">
            <div className="stadium-form-component">
              <h1 className="main-tittle">
                Welcome, Please select your current Location</h1>
              <h2 className="second-tittle">We can know in which Stadium you are. Just click on "Locate Nearest Stadium"</h2>
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
                          <button id="search-button" className="main-btn btn btn-success btn-sm btn-block" onClick={this.search.bind(this)}>Search for Stadium</button>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group2 text-center">
                          <button id="location-button" className="main-btn btn btn-success btn-sm btn-block" onClick={this.handleClick.bind(this)}>Locate Nearest Stadium</button>
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
    );
  }
}
