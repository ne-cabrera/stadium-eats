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
      <div className="row border-bottom detail">
        <div className="col-md-4">
          <a href="">
            {(this.props.img === "" || this.props.img === undefined) ?
              <img className="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="" /> :
              <img className="img-fluid rounded mb-3 mb-md-0" src={this.props.img} alt={"image of " + this.props.plateName} />
            }
          </a>
        </div>
        <div className="col-md-8">
          <div className="col-md-6">
            <h3>{this.props.plateName}</h3>
            <p className="ingredients">
              {this.props.ingredients}
            </p>
          </div>
          <div className="col-md-3">
            <p>${this.props.price}</p>
            <div className="pad">
              <button className="btn btn-primary pad" onClick={this.handleClick}>Add!</button>
            </div>

          </div>
        </div>

      </div>

    );
  }
}