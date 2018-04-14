import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Restaurantes } from "../../../api/restaurantes";
import { Restaurant } from "./Restaurant";

class RestaurantList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stadium: "All"
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      stadium: e.target.value
    });
  }

  renderRestaurantsStadium() {
    if(this.state.stadium === "All") {
      return (
        <div className="row">
          {this.props.restaurants.map((d, i) =>
            <Restaurant name={d.name} img={d.img} menu={d.menu} comment={d.comment} key={i} />
          )}
        </div>
      );
    } else if(this.state.stadium === "Campin") {
      return (
        <div className="row">
          {this.props.restaurantsCampin.map((d, i) =>
            <Restaurant name={d.name} img={d.img} menu={d.menu} comment={d.comment} key={i} />
          )}
        </div>
      );
    } else if(this.state.stadium === "Caneca") {
      return (
        <div className="row">
          {this.props.restaurantsCaneca.map((d, i) =>
            <Restaurant name={d.name} img={d.img} menu={d.menu} comment={d.comment} key={i} />
          )}
        </div>
      );
    } else if(this.state.stadium === "Techo") {
      return (
        <div className="row">
          {this.props.restaurantsTecho.map((d, i) =>
            <Restaurant name={d.name} img={d.img} menu={d.menu} comment={d.comment} key={i} />
          )}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="main-tit padDow">Custom search field</h2>
              <div id="custom-search-input">
                <div className="input-group col-md-12">
                  <input type="text" className="form-control input-lg" placeholder="Buscar" />
                  <span className="input-group-btn">
                    <button className="btn btn-info btn-lg" type="button">
                      <i className="glyphicon glyphicon-search"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.renderRestaurantsStadium()}
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("restaurantes");

  return {
    restaurants: Restaurantes.find({}).fetch(),
    restaurantsCampin: Restaurantes.find({ stadium: "Campin" }).fetch(),
    restaurantsCaneca: Restaurantes.find({ stadium: "Caneca" }).fetch(),
    restaurantsTecho: Restaurantes.find({ stadium: "Techo" }).fetch()
  };
})(RestaurantList);