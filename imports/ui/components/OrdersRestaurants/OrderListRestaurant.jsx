import React from "react";
import { Orders } from "../../../api/orders";
import { withTracker } from "meteor/react-meteor-data";
import { OrderDetailRestaurant } from "../../components/OrdersRestaurants/OrderDetailRestaurant";
import {Pagination} from "../pagination/Pagination";
import {Session} from "meteor/session";
class OrderListRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderState: "",
      currentPage: 1
    }
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.select = this.select.bind(this);
  }

  previous(){
    var curr = this.state.currentPage - 1;
    if(curr >= 1){
      this.setState({
        currentPage: curr
      })
    }
  }

  next(){
    var curr = this.state.currentPage + 1;
    var max = Math.ceil(this.props.orders.length / 4);
    if(curr <= max){
      this.setState({
        currentPage: curr
      })
    }
  }

  select(num){
    this.setState({
      currentPage: num
    })
  }

  onChange(idOr, stateO) {
    Meteor.call("orders.changeState", idOr, stateO);

  }

  changeOrderState(e) {
    console.log("aaaaa");
    e.preventDefault();
    var oState = e.target.value;
    this.setState({
      orderState: oState
    });
    console.log(oState);
    Session.set("oState", oState);
  }

  renderOrdersPag(){
    let i = (this.state.currentPage - 1) * 4;
    let j = this.state.currentPage * 4;
    var arr = [];
    for(i; i< j && i<this.props.orders.length; i++){
      var d = this.props.orders[i];
      arr.push(<OrderDetailRestaurant
        plates={d.items}
        state={d.state}
        price={d.price}
        date={d.createdAt.toString()}
        restName={d.restaurantName}
        idOrder={d._id}
        username={d.userName}
        sector={d.sector}
        stand={d.stand}
        row={d.row}
        sitnum={d.sitnum}
        key={i}
        onChange={this.onChange.bind(this)} />)
    }
    return arr;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Your Orders:</h3>
        </div>
        <div>
          <label htmlFor="">Filter Orders by:</label>
        </div>
        <div>
          <select className="custom-select wid" value={this.state.orderState} onChange={this.changeOrderState.bind(this)}>
            <option value="order received">Order Received</option>
            <option value="preparing">Preparing</option>
            <option value="delivering">Delivering</option>
            <option value=""> No Filter </option>
          </select>
          <hr />
        </div>
        <div>
        <div className="container">
          <div className="row">
            {this.renderOrdersPag().map((d) =>
            d
            )}
          </div>
        </div>
        </div>
        <div className="pagCont">
          <Pagination items={Math.ceil(this.props.orders.length / 4)} current={this.state.currentPage} previous={this.previous} next={this.next} select={this.select}/>
        </div>
      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe("orders");
  let owner = sessionStorage.getItem("username");
  let filt = Session.get("oState");
  console.log(filt);
    if( filt === "" || filt === undefined){
      return {orders: Orders.find({ restaurantName: owner }, { sort: { createdAt: -1 } }).fetch()}
    }
    else{
      return {orders: Orders.find({ restaurantName: owner, state: filt }, { sort: { createdAt: -1 } }).fetch()}
    }
})(OrderListRestaurant);