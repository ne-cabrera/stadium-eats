import React, {Component} from "react";

export class OrderProgressPreparing extends Component{

    render(){
        return(
            <div className="container">
                <ul className="progressbar">
                    <li className="active">Order Placed</li>
                    <li className="active">Preparing</li>
                    <li>Delivering</li>
                </ul>
            </div>
            
        );
    }
}