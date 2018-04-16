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
      <div className="col-md-6 restContainer2">
        <div className="card sizeC">
          {(this.props.img === "" || this.props.img === undefined) ?
            <img className="restImg card-img-top" src="http://placehold.it/700x300" alt="" /> :
            <img className="restImg card-img-top" src={this.props.img} alt={"image of " + this.props.plateName} />
          }
          <div className="card-body">
            <h3 className="card-title plate-name ">{this.props.plateName}</h3>
            <h4 className="card-subtitle mb-2 text-muted subtit">{this.props.ingredients}</h4>
            <div>
              <p className="price">{this.props.price}COP</p>
            </div>
            {Meteor.user() !== null ? (
              <div>
                <div className="pad">
                  <button className="btn btn-success pad" onClick={this.handleClick}>Add!</button>
                </div>
              </div>

            ) : ""}

          </div>
        </div>
      </div>

    );
  }
}