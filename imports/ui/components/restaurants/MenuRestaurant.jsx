import React from "react";

export default class MenuRestaurant extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row menuItem">
        <div className="col-md-6">
          <p className="plateName">{this.props.plateName}</p>
          <p className="ingredients">{this.props.ingredients}</p>
        </div>
        <div className="col-md-6">
          <p>${this.props.price}</p>
        </div>
      </div>

    );
  }
}