import React, { Component } from "react";
import { MenuItem } from "./MenuItem";
import { Order } from "./Order";
import { ConfirmOrder } from "./ConfirmOrder";
import { Orders } from "../../../api/orders";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { ClientAppNav } from "../navs/ClientAppNav";
import { HeaderRestaurant } from "../HeaderRestaurant";
import { NavNotLogin } from "../navs/NavNotLogin";

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
        var resOwn = this.props.location.state.owner;
        let rowT = document.getElementById("rowT").value;
        let sitnum = document.getElementById("sitnum").value;
        let locationT = {
            sector: this.state.sector,
            stand: this.state.stand,
            row: document.getElementById("rowT").value,
            sitnum: document.getElementById("sitnum").value
        };

        if(rowT === "" || sitnum === "") {
            this.setState({
                err: "Please give us your full location"
            });
        } else {
            console.log("aaaaaaaaaaaaaaaaaaaaa");
            console.log(resOwn);
            Meteor.call("orders.insert", prods, total, resName, userName, locationT, resOwn);
            alert("Order sent successfully");
        }
        rowT = document.getElementById("rowT").value = "";
        rowT = document.getElementById("sitnum").value = "";

    }

    render() {
        console.log(this.props.location);

        return (
            <div>
                {Meteor.user() !== null ? <ClientAppNav onClick={this.logout} /> : <NavNotLogin />}


                <HeaderRestaurant />
                <div className="row restContainer">
                    <div className="col-md-7 restContainer">
                        <div className="row">
                            {this.props.location.state.menu.map((d, i) =>
                                <MenuItem
                                    plateName={d.plateName}
                                    ingredients={d.ingredients}
                                    price={d.price}
                                    img={d.img}
                                    key={i}
                                    onClick={this.addItem} />)}
                        </div>
                    </div>
                    <div className="">
                        <div className="order">
                            <div data-spy="affix">
                                <div className="row">
                                    {this.state.selectedItems.length !== 0 ?
                                        (
                                            <div className="card">
                                                <h3 className="order-tit"><b>Your Order:</b></h3>
                                                <div className="row ">
                                                    <div className="container">
                                                        {this.state.selectedItems.map((d, i) =>
                                                            <Order plateName={d.plateName} price={d.price} amount={d.amount} onClick={this.removeItem} key={i} />
                                                        )}
                                                    </div>
                                                    {this.state.selectedItems.length === 0 ? <div></div> :
                                                        (<Link to={
                                                            {
                                                                pathname: "/confirmOrderPage",
                                                                state:
                                                                    {
                                                                        selectedItems: this.state.selectedItems,
                                                                        total: this.calcularTotal(),
                                                                        resName: this.props.location.state.name,
                                                                        resOwn: this.props.location.state.owner
                                                                    }
                                                            }}>
                                                            <ConfirmOrder total={this.calcularTotal()} /> </Link>)}
                                                </div>
                                            </div>
                                        )
                                        : <div></div>}
                                    {this.state.err !== "" ?
                                        <div class="alert alert-danger" role="alert">
                                            {this.state.err}
                                        </div> :
                                        ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
