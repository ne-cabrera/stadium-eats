import React, {Component} from "react";

export class ConfirmOrder extends Component{

    render(){
        return(
            <div>
                <p>Total: {this.props.total}</p>
                <button type="button" className="btn btn-primary btn-lg btn-block btnConfirm"> Confirm Order </button>
            </div>
        );
    }
}