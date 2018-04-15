import React, { Component } from "react";

export class ConfirmOrder extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div>
        <p>Total: {this.props.total}</p>
        <button type="button" className="main-btn btn btn-success btn-sm btn-block"> Confirm Order </button>
      </div>
    );
  }
}