import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Orders } from "../../../api/orders";
import { OrderDetail } from "./OrderDetail";

class OrdersList extends Component {

  render() {
    console.log(this.props.orders);
    return (
      <div className="container">
        <div className="row">
          <h3>Your Orders:</h3>
        </div>
        <div className="container">
          {this.props.orders.map((d, i) =>
            <OrderDetail plates={d.items} state={d.state} price={d.price} restName={d.restaurantName} key={i} />
          )}
        </div>
      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe("orders");

  return {
    orders: Orders.find({}).fetch()
  };
})(OrdersList);