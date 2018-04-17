import React, {Component} from "react";
import { withTracker } from "meteor/react-meteor-data";
import {Chats} from "../../../api/chats";
import {ChatsR} from "./ChatsR";
import Chat from "../chat/Chat";
import {HeaderRestaurant} from "../HeaderRestaurant";
import {RestaurantAppNav} from "../navs/RestaurantAppNav";

class ChatDelivery extends Component{

    constructor(props){
        super(props);
        this.state = {
            chatId: ""
        };
        this.openChat = this.openChat.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        Meteor.logout((err) => {
            if(err) {
                console.log(err.reason);
            }
        });
    }

    openChat(clientId, ordId){
        Meteor.call("chats.findChatRes", clientId, ordId, (err, res) => {
            if(err){
                console.log(err);
            }
            else{
                var chId = res[0]._id;
                console.log(chId);
                Session.set("chatId", chId);
                this.setState({
                    chatId: chId
                });
            }
        });
    }
    render(){
        console.log(this.state.chatId);
        return(
            <div>
                <RestaurantAppNav onClick={this.logout} />
                <HeaderRestaurant />
                <div className="container chatResCont">
                    <div className="row">
                        <div className="col-md-6">
                            <ul className="chatsList">
                                {this.props.chats.map((d,i) =>
                                    <ChatsR order={d.orderId} userId={d.user} key={i} onClick={this.openChat}/>
                                )}
                            </ul>
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
export default withTracker(() =>{
    Meteor.subscribe("chats");
    var id = Meteor.userId();
    console.log(id);
    return {
        chats: Chats.find({ resOwner: id}).fetch()
    };
})(ChatDelivery);
