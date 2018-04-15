import React from "react";
import { OrderInfo } from "../components/restaurants/OrderInfo";
import { ClientAppNav } from "../components/navs/ClientAppNav";
import { HeaderRestaurant } from "../components/HeaderRestaurant";
import { withHistory, Link } from "react-router-dom";
import { ConfirmButton } from "../components/restaurants/ConfirmButton";
export default class ConfirmOrderPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stand: "",
      sector: "",
      err: ""
    };
  }


  onChange1(e) {
    e.preventDefault();
    this.setState({
      sector: e.target.value
    });

  }
  onChange2(e) {
    e.preventDefault();
    this.setState({
      stand: e.target.value
    });
  }
  handleSubmit(e) {
    var prods = this.props.location.state.selectedItems;
    var total = this.props.location.state.total;
    let userName = Meteor.user().username;
    var resName = this.props.location.state.resName;
    let rowT = document.getElementById("rowT").value;
    let sitnum = document.getElementById("sitnum").value
    let locationT = {
      sector: this.state.sector,
      stand: this.state.stand,
      row: document.getElementById("rowT").value,
      sitnum: document.getElementById("sitnum").value
    }

    if(rowT === "" || sitnum === "") {
      this.setState({
        err: "Please give us your full location"
      });
    } else {
      Meteor.call("orders.insert", prods, total, resName, userName, locationT);
      alert("Order sent successfully");
    }
    rowT = document.getElementById("rowT").value = "";
    rowT = document.getElementById("sitnum").value = "";
  }

  render() {
    console.log(this.props.location.state);
    return (


      <div >
        <ClientAppNav />
        <HeaderRestaurant />

        <div className="row">
          <div className="order-info  ">
            <div className="card cardS ">
              <h3 className="order-tit"><b>Yor Location Information:</b></h3>
              <form id="location-form" className="form col-md-12 center-block" onSubmit={this.handleSubmit.bind(this)}  >
                <div>
                  <label htmlFor="">
                    <p>Sector</p>
                  </label>
                </div>
                <div className="form-group">
                  <select className="custom-select wid" id="sector " onChange={this.onChange1.bind(this)}>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="">
                    <p>Stand</p>
                  </label>
                </div>
                <div className="form-group">
                  <select className="custom-select wid" id="stand" onChange={this.onChange2.bind(this)}>
                    <option value="North">High</option>
                    <option value="South">Low</option>
                  </select>
                </div>
                <div>
                  <label>
                    <p>Row</p>
                  </label>
                </div>
                <div className="form-group">
                  <input type="text" id="rowT" className="form-control input-lg" placeholder="Row" />
                </div>
                <div>
                  <label htmlFor="">
                    <p>Seat Number</p>
                  </label>
                </div>
                <div className="form-group">
                  <input type="number" id="sitnum" className="form-control input-lg" placeholder="Sit Number" />
                </div>
                <div className="form-group">
                  <Link to="/myOrders"><ConfirmButton onClick={this.handleSubmit.bind(this)} /> </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 orderInfo">
            <div data-spy="affix">
              <div className="row">
                {this.props.location.state.selectedItems.length !== 0 ?
                  (
                    <div className="card">
                      <h3 className="order-tit"><b>Your Order Summary:</b></h3>
                      <div className="row ">
                        <div className="container">
                          {this.props.location.state.selectedItems.map((d, i) =>
                            <OrderInfo plateName={d.plateName} price={d.price} amount={d.amount} key={i} />
                          )}
                        </div>
                      </div>
                      <p>total: {this.props.location.state.total}</p>
                    </div>
                  )
                  : <div></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}