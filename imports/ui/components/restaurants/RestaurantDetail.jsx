import React, { Component } from "react";
import { MenuItem } from "./MenuItem";
import { Order } from "./Order";
import { ConfirmOrder } from "./ConfirmOrder";
import { Orders } from "../../../api/orders";
import { Meteor } from 'meteor/meteor';
import { Link } from "react-router-dom";

export class RestaurantDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: []
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.calcularTotal = this.calcularTotal.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
  }

  backHome(e) {
    e.preventDefault();
    Meteor.logout((err) => {
      if(err) {
        console.log(err.reason);
      } else {

        this.props.history.push("/Home");
      }
    });
    this.props.history.push("/Home");

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
    var resName = this.props.location.state.name;
    Meteor.call("orders.insert", prods, total, resName);
    alert("Order sent successfully");
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">Stadium Eats</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.backHome.bind(this)}>Home</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row restName">
            <h2>{this.props.location.state.name}2</h2>
          </div>
          <div className="row">
            <div className=" col-lg-8">
              {this.props.location.state.menu.map((d, i) =>
                <MenuItem plateName={d.plateName} ingredients={d.ingredients} price={d.price} key={i} onClick={this.addItem} />)}
            </div>
            <div className="col-lg-4 order">
              <div className="container">
                <div className="row">
                  {this.state.selectedItems.length !== 0 ? <h3>Your Order:</h3> : <div></div>}
                </div>
                <div className="row">
                  <div className="container">
                    {this.state.selectedItems.map((d, i) =>
                      <Order plateName={d.plateName} price={d.price} amount={d.amount} onClick={this.removeItem} key={i} />
                    )}
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