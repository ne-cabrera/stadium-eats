import React, { Component } from "react";
import { OrderProgress } from "./progress/OrderProgress";
import { OrderProgressPreparing } from "./progress/OrderProgressPreparing";
import { OrderProgressDelivering } from "./progress/OrderProgressDelivering";
import { withHistory, Link } from "react-router-dom";

export class OrderDetail extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
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
                <div className="card cardOrder">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <h3><Link to={{ pathname: "/orderDetail", state: { orderId: this.props.orderId, restName: this.props.restName, plates: this.props.plates, price: this.props.price, state: this.props.state } }}>
                                    {this.props.restName}</Link></h3>
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