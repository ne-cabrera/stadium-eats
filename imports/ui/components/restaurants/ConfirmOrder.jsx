import React, { Component } from "react";

export class ConfirmOrder extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <div>
                <p>Total: {this.props.total}</p>
                <button type="button" className="btn btn-primary btn-lg btn-block btnConfirm" onClick={this.handleClick}> Confirm Order </button>
            </div>
        );
    }
}