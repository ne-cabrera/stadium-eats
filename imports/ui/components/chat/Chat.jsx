import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { ChatMsgs } from "../../../api/chatMsgs";
import { Meteor } from "meteor/meteor";
import { Msj } from "./Msj";
import { MsjInput } from "./MsjInput";
import { Session } from "meteor/session";

class Chat extends Component {

    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(msj) {
        var sender = Meteor.userId();
        if(msj !== "" || msj !== " ") {

            Meteor.call("chatMsgs.insert", sender, msj, this.props.chatId);
            console.log("aaaaaa");
        }
    }

    render() {
        return (
            <div className="container">

                <div className="row">

                    <div id="chatContainer">

                        {this.props.messages.map((d, i) =>
                            <Msj msg={d} key={i} />)}
                    </div>
                </div>
                <div className="row">
                    <MsjInput onSubmit={this.sendMessage} />
                </div>
            </div>

        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("chatMsgs");
    var chId = Session.get("chatId");
    return {
        messages: ChatMsgs.find({ chatId: chId }).fetch()
    };
})(Chat);