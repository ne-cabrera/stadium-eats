import React, { Component } from "react";

export class MsjInput extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        console.log("aaaaaaaaa");
        var msj = document.getElementById("newMsg").value;
        if(msj !== " " || msj !== "") {
            this.props.onSubmit(msj);
            document.getElementById("newMsg").value = "";
        }

    }

    render() {
        return (
            <div className="msgInput" onSubmit={this.handleSubmit}>
                <input id="newMsg" type="text" placeholder="Type a message" />
                <button className="sendButton" onClick={this.handleSubmit}>Send</button>
            </div>
        )
    }
}