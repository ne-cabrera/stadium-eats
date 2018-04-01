import React from "react";
import { Restaurantes } from "../../api/restaurantes";
import { withTracker } from "meteor/react-meteor-data";
import { withHistory } from "react-router-dom";
import OrderListRestaurant from "../../ui/components/OrdersRestaurants/OrderListRestaurant";

export default class MainPageRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    console.log(this.props);
    return (
      <div>
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
