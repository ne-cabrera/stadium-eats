import React, { Component } from "react";

export class MenuItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var item = {};
    item.plateName = this.props.plateName;
    item.price = this.props.price;
    this.props.onClick(item);
  }

  render() {
    return (
      <div>
        <div className="card">
          {(this.props.img === "" || this.props.img === undefined) ?
            <img className="img-fluid rounded mb-3 mb-md-0 card-img-top" src="http://placehold.it/700x300" alt="" /> :
            <img className="img-fluid rounded mb-3 mb-md-0 card-img-top" src={this.props.img} alt={"image of " + this.props.plateName} />
          }
          <div className="card-body">
            <h3 className="card-title plate-name">{this.props.plateName}</h3>
            <h4 className="card-subtitle mb-2 text-muted subtit">{this.props.ingredients}</h4>
            <div>
              <p>{this.props.price}COP</p>
            </div>
            <div className="pad">
              <button className="btn btn-primary pad" onClick={this.handleClick}>Add!</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}