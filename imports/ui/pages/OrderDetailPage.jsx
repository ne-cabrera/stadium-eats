import React from "react";
import Chat from "../components/chat/Chat";
import { Chats } from "../../api/chats";
import { ClientAppNav } from "../components/navs/ClientAppNav";
import { HeaderRestaurant } from "../components/HeaderRestaurant";
import { OrderProgress } from "../components/clientOrders/progress/OrderProgress";
import { OrderProgressPreparing } from "../components/clientOrders/progress/OrderProgressPreparing";
import { OrderProgressDelivering } from "../components/clientOrders/progress/OrderProgressDelivering";
import HeaderClient from "../components/Headers/HeaderClient";

export default class OrderDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            chatId: ""
        };
    }
    logout() {
        Meteor.logout((err) => {
            if(err) {
                console.log(err.reason);
            }
        });
    }

    selectProgress() {
        if(this.props.location.state.state === "order received") {
            return (<OrderProgress />);
        }
        else if(this.props.location.state.state === "preparing") {
            return (<OrderProgressPreparing />);
        }
        else {
            return (<OrderProgressDelivering />);
        }
    }

    createChat() {
        Meteor.call("chats.insertChat", this.props.location.state.owner, this.props.location.state.orderId, (err, res) => {
            if(err) {
                console.log(err);
            }
            else {
                Meteor.call("chats.findChat", this.props.location.state.owner, this.props.location.state.orderId, (err, res) => {
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


    render() {
        return (
            <div>
                <ClientAppNav onClick={this.logout} />
                <HeaderClient />

                <div className="container">
                    <div className="row">
                        <div className=" col-md-6">
                            <div className="card cardOrder">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h3>
                                                {this.props.location.state.restName}</h3>
                                        </div>
                                        <div className="col-md-4">
                                            <button type="button" className="btn btn-primary" onClick={this.createChat.bind(this)}>Chat</button>
                                        </div>
                                    </div>
                                    {
                                        this.props.location.state.plates.map((d, i) => (
                                            <div key={i}>
                                                <p>({d.amount}) {d.plateName}...   ${d.price}</p>
                                            </div>
                                        ))
                                    }
                                    <div>
                                        <h6>Total: ${this.props.location.state.price}</h6>
                                    </div>
                                    <div>
                                        {this.selectProgress()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 padchat" data-spy="affix">
                            <div className="container">
                                {this.state.chatId !== "" ? <Chat chatId={this.state.chatId} /> : <div></div>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );

    }
}