import React, {Component} from "react";
import {MenuItem} from "./MenuItem";

export class RestaurantDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedItems:[]
        };
        this.addItem = this.addItem.bind(this);
    }

    addItem(item){
        var items = this.state.selectedItems;
        items.push(item);
        this.setState({
            selectedItems: items
        });
    }
    
    render(){
        console.log(this.props);
        return(
            <div className="container">
                <div className="row restName">
                    <h2>{this.props.location.state.name}</h2>
                </div>
                <div className="container menuContainer">
                    {this.props.location.state.menu.map( (d, i) => 
                        <MenuItem plateName={d.plateName} ingredients={d.ingredients} price={d.price} key={i} onClick={this.addItem}/>)}
                </div>
            </div>
        );
    }
}