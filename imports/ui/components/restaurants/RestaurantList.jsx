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
            <Restaurant name={d.name} img={d.img} menu={d.menu} key={i} />
          )}
        </div>
      );
    } else if(this.state.stadium === "Campin") {
      return (
        <div className="row">
          {this.props.restaurantsCampin.map((d, i) =>
            <Restaurant name={d.name} img={d.img} menu={d.menu} key={i} />
          )}
        </div>
      );
    } else if(this.state.stadium === "Caneca") {
      return (
        <div className="row">
          {this.props.restaurantsCaneca.map((d, i) =>
            <Restaurant name={d.name} img={d.img} menu={d.menu} key={i} />
          )}
        </div>
      );
    } else if(this.state.stadium === "Techo") {
      return (
        <div className="row">
          {this.props.restaurantsTecho.map((d, i) =>
            <Restaurant name={d.name} img={d.img} menu={d.menu} key={i} />
          )}
        </div>
      );
    }
  }

  render() {
    console.log(this.props.restaurants);
    return (
      <div className="container">
        <div className="container">
          <div>
            <h2>
              Select Your Current Stadium
            </h2>
          </div>
          <select className="custom-select wid" value={this.props.state} onChange={this.onChange.bind(this)}>
            <option value="All">All</option>
            <option value="Campin">Nemesio Camacho el Campin</option>
            <option value="Techo">Estadio Metropolitano de Techo</option>
            <option value="Caneca">La Caneca</option>
          </select>
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