import React, { Component } from "react";
import { OrderProgress } from "./progress/OrderProgress";
import { OrderProgressPreparing } from "./progress/OrderProgressPreparing";
import { OrderProgressDelivering } from "./progress/OrderProgressDelivering";

export class OrderDetail extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onClick(this.props.orderId);
    }

    selectProgress() {
        if(this.props.state === "order received") {
            return (<OrderProgress />);
        }
        else if(this.props.state === "preparing") {
            return (<OrderProgressPreparing />);
        }
        else {
            return (<OrderProgressDelivering />);
        }
    }

    render() {
        return (
            <div className=" border-bottom detail">
                <div className="card">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <h3>{this.props.restName}</h3>
                            </div>
                            <div className="col-md-4">
                                <button type="button" className="btn btn-primary" onClick={this.handleClick}>Chat</button>
                            </div>
                        </div>
                        {
                            this.props.plates.map((d, i) => (
                                <div key={i}>
                                    <p>({d.amount}) {d.plateName}...   ${d.price}</p>
                                </div>
                            ))
                        }
                        <div>

                            <h6>Total: ${this.props.price}</h6>
                        </div>
                        <div>
                            {this.selectProgress()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}