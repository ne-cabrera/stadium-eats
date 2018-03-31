import React, {Component} from "react";

export class OrderProgress extends Component{

    render(){
        return(
            <div className="container">
                <ul className="progressbar">
                    <li className="active">Order Placed</li>
                    <li>Preparing</li>
                    <li>Delivering</li>
                </ul>
            </div>
            
        );
    }
}