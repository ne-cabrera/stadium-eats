import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Orders } from "../../../api/orders";
import { OrderDetail } from "./OrderDetail";
import { ClientAppNav } from "../navs/ClientAppNav";
import {RestaurantAppNav} from "../navs/RestaurantAppNav";
import {Chats} from "../../../api/chats";
import Chat from "../chat/Chat";
import { Session } from "meteor/session";
import { HeaderRestaurant } from "../HeaderRestaurant";
import { Pagination } from "../pagination/Pagination";

class OrdersList extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.createChat = this.createChat.bind(this);
        this.state = {
            chatId: "",
            currentPage: 1
        };
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.select = this.select.bind(this);
    }

    previous(){
        var curr = this.state.currentPage - 1;
        if(curr >= 1){
            this.setState({
                currentPage: curr
            });
        }
    }
    
    next(){
        var curr = this.state.currentPage + 1;
        var max = Math.ceil(this.props.orders.length / 5);
        if(curr <= max){
            this.setState({
                currentPage: curr
            });
        }
    }
    
    select(num){
        this.setState({
            currentPage: num
        });
    }

    createChat(id, ordId){
        Meteor.call("chats.insertChat", id, ordId, (err, res) =>{
            if(err){
                console.log(err);
            }
            else{
                Meteor.call("chats.findChat", id, ordId, (err, res) => {
                    if(err){
                        console.log(err);
                    }
                    else{
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

    renderOrdersDetail(){
        let i = (this.state.currentPage - 1) * 5;
        let j = this.state.currentPage * 5;
        var arr = [];
        for(i; i< j && i<this.props.orders.length; i++){
            var d = this.props.orders[i];
            arr.push(<OrderDetail plates={d.items} state={d.state} price={d.price} restName={d.restaurantName} owner={d.restaurantOwner} key={i} orderId={d._id} onClick={this.createChat} />);
        }
        return arr;
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
                    <div className="row">
                        <div className="col-md-6">
                            <div className="container">
                                {this.renderOrdersDetail().map((d) => d )}
                            </div>
                            <div>
                                <Pagination items={Math.ceil(this.props.orders.length / 5)} previous={this.previous} next={this.next} select={this.select}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {this.state.chatId !== "" ? <Chat chatId={this.state.chatId}/> : <div></div>}
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