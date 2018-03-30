import React, {Component} from "react";

export class OrderProgressDelivering extends Component{

    render(){
        return(
            <div className="container">
                <ul className="progressbar">
                    <li className="active">Order Placed</li>
                    <li className="active">Preparing</li>
                    <li className="active">Delivering</li>
                </ul>
            </div>
            
        );
    }
}