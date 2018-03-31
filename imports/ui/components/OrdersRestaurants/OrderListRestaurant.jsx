import React from "react";
import { Orders } from "../../../api/orders";
import { withTracker } from "meteor/react-meteor-data";
import { OrderDetailRestaurant } from "../../components/OrdersRestaurants/OrderDetailRestaurant";
class OrderListRestaurant extends React.Component {


  onChange(idOr, stateO) {

    console.log(idOr, stateO)
    Meteor.call("orders.changeState", idOr, stateO);

  }

  render() {
    console.log(this.props.orders);
    return (
      <div className="container">
        <div className="row">
          <h3>Your Orders:</h3>
        </div>
        <div className="container">
          {this.props.orders.map((d, i) =>
            <OrderDetailRestaurant
              plates={d.items}
              state={d.state}
              price={d.price}
              restName={d.restaurantName}
              idOrder={d._id}
              key={i}
              onChange={this.onChange.bind(this)} />
          )}
        </div>

      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe("orders");
  let owner = sessionStorage.getItem("username");
  return {
    orders: Orders.find({ restaurantName: owner }).fetch()
  };
})(OrderListRestaurant);