import React, {Component} from "react";

export class ChatsR extends Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onClick(this.props.userId, this.props.order);
    }

    render(){
        console.log(Meteor.users.find({}).fetch());
        return(
            <li onClick={this.handleClick}>
                <p>{this.props.order}</p>
            </li>
        )
    }
}