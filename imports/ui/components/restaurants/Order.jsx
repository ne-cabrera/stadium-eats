import React, { Component } from "react";

export class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numOpts: [],
            ammount: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        item = {};
        item.plateName = this.props.plateName;
        item.price = this.props.price;
        this.props.onClick(item);
    }

    options() {
        var opts = [];
        for(let i = 0; i <= 5; i++) {
            opts.push(i);
        }
        this.setState({
            numOpts: opts
        });
    }

    componentWillMount() {
        this.options();
    }

    render() {
        return (
            <div className="row orderContainer">
                <div className="col-md-6">
                    <div>
                        <p>{this.props.plateName}</p>
                    </div>
                    <div>
                        <button type="button" className="btn btn-danger btn-sm" onClick={this.handleClick}>Remove</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div>
            ${this.props.price}
                    </div>
                    <div className="amount">
            amount: {this.props.amount}
                    </div>
                </div>
            </div>
        );
    }
}