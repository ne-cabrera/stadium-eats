import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Orders } from "../../../api/orders";
import { OrderDetail } from "./OrderDetail";
import { ClientAppNav } from "../navs/ClientAppNav";
import { RestaurantAppNav } from "../navs/RestaurantAppNav";
import { Chats } from "../../../api/chats";
import Chat from "../chat/Chat";
import { Session } from 'meteor/session';
import { HeaderRestaurant } from "../HeaderRestaurant";
import HeaderClient from "../Headers/HeaderClient";

class OrdersList extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.createChat = this.createChat.bind(this);
        this.state = {
            chatId: ""
        };
    }

    createChat(id) {
        Meteor.call("chats.insertChat", id, (err, res) => {
            if(err) {
                console.log(err);
            }
            else {
                Meteor.call("chats.findChat", id, (err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        var chId = res[0]._id;
                        Session.set("chatId", chId);
                        this.setState({
                            chatId: chId
                        });
                    }
                });
            }
        });
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
                <HeaderClient />
                <div className="container">
                    <div className="row">
                        <h3 className="detail">Your Orders:</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="container">
                                {this.props.orders.map((d, i) =>
                                    <OrderDetail plates={d.items} state={d.state} price={d.price} restName={d.restaurantName} key={i} orderId={d._id} onClick={this.createChat} />
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default withTracker(() => {
    Meteor.subscribe("orders");
    Meteor.subscribe("chats");
    let idOwner = sessionStorage.getItem("id");
    return {
        orders: Orders.find({ clientId: idOwner }, { sort: { createdAt: -1 } }).fetch()
    };
})(OrdersList);