import React, {Component} from "react";
import { withTracker } from "meteor/react-meteor-data";
import {Chats} from "../../../api/chats";
import {ChatsR} from "./ChatsR";

class ChatDelivery extends Component{

    constructor(props){
        super(props);
        this.state = {
            chatId: ""
        }
        this.openChat = this.openChat.bind(this);
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
        console.log(this.props.chats)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        {this.props.chats.map((d,i) =>
                            <ChatsR order={d.orderId} userId={d.user} key={i} onClick={this.openChat}/>
                        )}
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
