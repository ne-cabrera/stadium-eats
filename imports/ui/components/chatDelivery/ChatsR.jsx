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
        return(
            <div >
                <p>{this.props.order}</p>
                <button onClick={this.handleClick}>open</button>
            </div>
        )
    }
}