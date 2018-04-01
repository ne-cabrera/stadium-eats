import React, { Component } from "react";
import { OrderProgress } from "./progress/OrderProgress";
import { OrderProgressPreparing } from "./progress/OrderProgressPreparing";
import { OrderProgressDelivering } from "./progress/OrderProgressDelivering";

export class OrderDetail extends Component {

  selectProgress() {
    console.log("Hola")
    if(this.props.state === "order received") {
      return (<OrderProgress />)
    }
    else if(this.props.state === "preparing") {
      return (<OrderProgressPreparing />)
    }
    else {
      return (<OrderProgressDelivering />)
    }
  }

  render() {
    return (
      <div>

        <div className="row border-bottom detail" >
          <div className="col-md-4">
            <a href="">
              <img className="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="" />
            </a>
          </div>
          <div className="col-md-8">
            <h3>{this.props.restName}</h3>
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
              {this.selectProgress()}
            </div>
          </div>
        </div>

      </div>
    );
  }
}