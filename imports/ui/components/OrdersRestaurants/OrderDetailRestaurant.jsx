import React from "react";

export class OrderDetailRestaurant extends React.Component {


  onChange(e) {
    e.preventDefault();
    this.props.onChange(this.props.idOrder, e.target.value);
  }

  render() {

    return (

      <div>

        <div className="row border-bottom detail" >

          <div className="col-md-8">
            <h3>Order # {this.props.idOrder}</h3>
            <div >
              <label htmlFor=""><b>Client: </b></label>
              <label htmlFor="">{this.props.username}</label>
            </div>
            <div >
              <label htmlFor=""><b>Date: </b></label>
              <label htmlFor="">{this.props.date}</label>
            </div>

            {
              this.props.plates.map((d, i) => (
                <div key={i}>
                  <p>({d.amount}) {d.plateName}...   ${d.price}</p>
                </div>
              ))
            }
            <div>
              <h6>Total: ${this.props.price}</h6>
            </div>
            <div>
              <select className="custom-select wid" value={this.props.state} onChange={this.onChange.bind(this)}>
                <option value="order received">Order Received</option>
                <option value="preparing">Preparing</option>
                <option value="delivering">Delivering</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    );
  }
}