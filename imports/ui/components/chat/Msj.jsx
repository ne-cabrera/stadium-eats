import React, {Component} from "react";

export class Msj extends Component{

    render(){
        console.log(this.props.msg.time.hour);
        return(
            <div>
                {this.props.msg.sender == Meteor.userId() ? (
                    <div className="container msjContainer darker">
                        <p>{this.props.msg.message}</p>
                    </div>
                ): (
                    <div className="container msjContainer">
                        <p>{this.props.msg.message}</p>
                    </div>
                )}
            </div>
        );
    }
}