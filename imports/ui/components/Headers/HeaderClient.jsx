import React from "react";
import { Session } from "meteor/session";

export default class HeaderRestaurant extends React.Component {
  render() {
    let location = Session.get("Estadio");
    return (
      <div className="page-header2">
        <div className="filter"></div>
        <div className="content-center">
          <div className="container">
            <div className="stadium-form-component">
              <h1 className="main-tittle">{"Welcome, You are currectly at " + location} </h1>
            </div>
          </div>
        </div>
      </div>

    );
  }
}