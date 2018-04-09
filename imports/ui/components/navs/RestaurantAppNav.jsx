import React, { Component } from "react";
import { Link } from "react-router-dom";

export class RestaurantAppNav extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top nav-down" >
          <div className="container">
            <div className="navbar-translate">
              <div className="navbar-header">
                <a href="" className="navbar-brand">Stadium Eats</a>
              </div>
              <button class="navbar-toggler navbar-burger" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item ">
                  <Link className="nav-link" to="/Home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/myMenu"> Menu</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={this.handleClick}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}