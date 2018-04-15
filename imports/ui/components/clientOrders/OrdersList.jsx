import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Orders } from "../../../api/orders";
import { OrderDetail } from "./OrderDetail";
import { ClientAppNav } from "../navs/ClientAppNav";
import { RestaurantAppNav } from "../navs/RestaurantAppNav";
import { HeaderRestaurant } from "../HeaderRestaurant";

class OrdersList extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        Meteor.logout((err) => {
            if(err) {
                console.log(err.reason);
            }
        });
    }

    render() {
        console.log(this.props.orders);
        return (
            <div>
                <ClientAppNav onClick={this.logout} />
                <HeaderRestaurant />
                <div className="container">
                    <div className="row">
                        <h3 className="detail">Your Orders:</h3>
                    </div>
                    <div className="container">
                        {this.props.orders.map((d, i) =>
                            <OrderDetail plates={d.items} state={d.state} price={d.price} restName={d.restaurantName} key={i} />
                        )}
                    </div>
                </div>
            </div>

        );
    }
}
export default withTracker(() => {
    Meteor.subscribe("orders");
    let idOwner = sessionStorage.getItem("id");
    return {
        orders: Orders.find({ clientId: idOwner }, { sort: { createdAt: -1 } }).fetch()
    };
})(OrdersList);