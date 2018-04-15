import React, { Component } from "react";
import { withHistory, Link } from "react-router-dom";

export class Restaurant extends Component {


  render() {
    return (
      <div className="col-lg-4 restContainer">
        <div className="card ">
          <Link to={{ pathname: "/restaurantDetail", state: { name: this.props.name, menu: this.props.menu } }}>
            <img className="restImg card-img-top" src={this.props.img} alt="Restaurant Logo or picture" />
          </Link>
          <div className="card-body">
            <h4 className="card-title  restName linkclean"> {this.props.name} </h4>
            <h6 className="card-subtitle mb-2 text-muted subtit">Description</h6>
            <p className="card-text">{this.props.comment}</p>

          </div>
        </div>
      </div>
    );
  }
}