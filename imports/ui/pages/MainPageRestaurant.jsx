import React from "react";
import { Restaurantes } from "../../api/restaurantes";
import { withTracker } from "meteor/react-meteor-data";
import { withHistory } from "react-router-dom";
import OrderListRestaurant from "../../ui/components/OrdersRestaurants/OrderListRestaurant";
import { HeaderRestaurant } from "../components/HeaderRestaurant";

export default class MainPageRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    console.log(this.props);
    return (
      <div>
        <HeaderRestaurant />
        <div className="padUp">
          <h1>
            {"Welcome " + this.props.currentUser}
          </h1>
        </div>
        <div>
          <OrderListRestaurant />
        </div>
      </div>

    );
  }
}
