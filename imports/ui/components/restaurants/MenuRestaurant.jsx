import React from "react";

export default class MenuRestaurant extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row border-bottom detail">
        <div className="col-md-4">
          <a href="">
            <img className="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="" />
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
          </div>
        </div>
      </div>

    );
  }
}