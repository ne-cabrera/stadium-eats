import React from "react";

export class OrderDetailRestaurant extends React.Component {


  onChange(e) {
    e.preventDefault();
    this.props.onChange(this.props.idOrder, e.target.value);
  }

  render() {

    return (
      <div className="orderContainer">
        <div>
          <h4 className="restName">{this.props.restName}</h4>
          {this.props.plates.map((d, i) => (
            <div key={i}>
              <p>({d.amount}){d.plateName}...   ${d.price}</p>
            </div>
          ))}
          <p>Total: ${this.props.price}</p>
          <div>
            <select value={this.props.state} onChange={this.onChange.bind(this)}>
              <option value="order received">Order Received</option>
              <option value="preparing">Preparing</option>
              <option value="delivering">Delivering</option>
            </select>
          </div>
        </div>

      </div>
    );
  }
}