import React, {Component} from "react";
import {MenuItem} from "./MenuItem";

export class RestaurantDetail extends Component{
    
    render(){
        console.log(this.props);
        return(
            <div className="container">
                <div className="row">
                    <h2>{this.props.location.state.name}</h2>
                </div>
                <div className="container">
                    {this.props.location.state.menu.map( (d, i) => 
                        <MenuItem plateName={d.plateName} ingredients={d.ingredients} price={d.price} key={i}/>)}
                </div>
            </div>
        );
    }
}