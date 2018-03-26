import React, {Component} from "react";

export class Restaurant extends Component{
    render(){
        return (
            <div className="col-md-4">
                <h5> {this.props.name} </h5>
            </div>
        )
    }
}