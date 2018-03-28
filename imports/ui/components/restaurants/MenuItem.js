import React, {Component} from "react";

export class MenuItem extends Component{

    render(){
        return(
            <div className="row">
                <div className="col-md-6">
                    <p>{this.props.plateName}</p>
                    <p>{this.props.ingredients}</p>
                </div>
                <div className="col-md-6">
                    <p>{this.props.price}</p>
                    <button>Add!</button>
                </div>
            </div>
        )
    }
}