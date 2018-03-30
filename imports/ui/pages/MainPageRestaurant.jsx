import React from "react";
import { Restaurantes } from "../../api/restaurantes";
import { withTracker } from "meteor/react-meteor-data";
import { withHistory } from "react-router-dom";


export default class MainPageRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }

  logoutThis(e) {
    e.preventDefault();
    this.props.logout(e);
  }

  toMenus(e) {
    e.preventDefault();
    this.props.toMenus(e);
  }


  render() {
    console.log(this.props);
    return (
      <div>
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
                <a className="nav-item nav-link " href="#" onClick={this.logoutThis.bind(this)}>Logout</a>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <h1>
            {"Welcome " + this.props.currentUser}
          </h1>
        </div>

      </div>

    );
  }
}
