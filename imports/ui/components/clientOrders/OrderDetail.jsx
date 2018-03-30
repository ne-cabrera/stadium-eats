import React, {Component} from "react";
import {OrderProgress} from "./progress/OrderProgress";
import {OrderProgressPreparing} from "./progress/OrderProgressPreparing";
import {OrderProgressDelivering} from "./progress/OrderProgressDelivering";

export class OrderDetail extends Component{

    selectProgress(){
        if(this.props.state === "order received"){
            return(<OrderProgress/>)
        }
        else if(this.props.state === "reparing"){
            return(<OrderProgressPreparing/>)
        }
        else{
            return(<OrderProgressDelivering/>)
        }
    }

    render(){
        return(
            <div className="orderContainer">
                <div>
                    <h4 className="restName">{this.props.restName}</h4>
                    {this.props.plates.map( (d, i) => (
                        <div key={i}>
                            <p>({d.amount}){d.plateName}...   ${d.price}</p>
                        </div>
                    ))}
                    <p>Total: ${this.props.price}</p>
                </div>
                <div>
                    {this.selectProgress()}
                </div>
            </div>
        );
    }
}