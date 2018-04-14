import React, { Component } from "react";
import { MenuItem } from "./MenuItem";
import { Order } from "./Order";
import { ConfirmOrder } from "./ConfirmOrder";
import { Orders } from "../../../api/orders";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { ClientAppNav } from "../navs/ClientAppNav";
import { HeaderRestaurant } from "../HeaderRestaurant";

export class RestaurantDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      stand: "",
      sector: "",
      err: ""
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.calcularTotal = this.calcularTotal.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
  }

  addItem(item) {
    var items = this.state.selectedItems;
    var found = false;
    console.log(item);
    for(let i of items) {
      if(i.plateName === item.plateName) {
        i.price += item.price;
        i.amount++;
        found = true;
      }
    }
    if(!found) {
      item.amount = 1;
      var pr = item.price;
      item.originalPrice = pr;
      items.push(item);
    }
    this.setState({
      selectedItems: items
    });
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

  removeItem(item) {
    var items = this.state.selectedItems;
    var num = 0;
    var sp = -1;
    for(let i of items) {
      if(i.plateName === item.plateName) {
        i.price -= i.originalPrice;
        i.amount--;
        if(i.prce === 0 || i.amount === 0) {
          sp = num;
        }
      }
      num++;
    }
    if(sp !== -1) {
      items.splice(sp, 1);
    }
    this.setState({
      selectedItems: items
    });
  }

  calcularTotal() {
    var total = 0;
    for(let i of this.state.selectedItems) {
      total += i.price;
    }
    return total;
  }

  confirmOrder() {
    var prods = this.state.selectedItems;
    var total = this.calcularTotal();
    let userName = Meteor.user().username;
    var resName = this.props.location.state.name;
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
    console.log(this.props);
    return (
      <div>
        <ClientAppNav onClick={this.logout} />

        <HeaderRestaurant />
        <div className="container">
          <div className="row restName">
            <h2 className="padUp">{this.props.location.state.name}</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              {this.props.location.state.menu.map((d, i) =>
                <MenuItem
                  plateName={d.plateName}
                  ingredients={d.ingredients}
                  price={d.price}
                  img={d.img}
                  key={i}
                  onClick={this.addItem} />)}
            </div>


            <div className="col-lg-4 order">
              <div className="container">
                <div className="row">
                  {this.state.selectedItems.length !== 0 ? <h3>Your Order:</h3> : <div></div>}
                  {this.state.err !== "" ?
                    <div class="alert alert-danger" role="alert">
                      {this.state.err}
                    </div> :
                    ""}
                </div>
                <div className="row">
                  <div className="container">
                    {this.state.selectedItems.map((d, i) =>
                      <Order plateName={d.plateName} price={d.price} amount={d.amount} onClick={this.removeItem} key={i} />
                    )}
                  </div>
                  <div className="row">
                    <div className="container">
                      {this.state.selectedItems.length !== 0 ?
                        <div>
                          <div>
                            <h3>
                              Your Location
                          </h3>
                          </div>
                          <form id="location-form" className="form col-md-12 center-block" >
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
                          </form>
                        </div>
                        : ""}
                    </div>
                  </div>
                </div>
                {this.state.selectedItems.length === 0 ? <div></div> : (<Link to="/myOrders"> <ConfirmOrder total={this.calcularTotal()} onClick={this.confirmOrder} /> </Link>)}
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}