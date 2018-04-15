import React, { Component } from "react";

export class ConfirmButton extends Component {

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
        <button type="button" className="btn btn-primary btn-lg btn-block btnConfirm" onClick={this.handleClick}> Confirm Order </button>
      </div>
    );
  }
}