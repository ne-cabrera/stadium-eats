import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Orders } from "../../../api/orders";
import { OrderDetail } from "./OrderDetail";

class OrdersList extends Component {
    backHome(e) {
        e.preventDefault();
        Meteor.logout((err) => {
            if(err) {
                console.log(err.reason);
            } else {

                this.props.history.push("/Home");
            }
        });
        this.props.history.push("/Home");

    }
    render() {
        console.log(this.props.orders);
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="#">Stadium Eats</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={this.backHome.bind(this)}>Home</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
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