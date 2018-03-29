import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Restaurantes } from "../../../api/restaurantes";
import { Restaurant } from "./Restaurant";

class RestaurantList extends Component {

  render() {
    console.log(this.props.restaurants);
    return (
      <div className="container">
        <div className="row">
          {this.props.restaurants.map((d, i) =>
            <Restaurant name={d.name} img={d.img} menu={d.menu} key={i} />
          )}
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    restaurants: Restaurantes.find({}).fetch()
  };
})(RestaurantList);