import React, {Component} from "react";
import {Link} from "react-router-dom";

export class Restaurant extends Component{
    render(){
        return (
            <div className="col-lg-4 restContainer">
                <Link to={{pathname: "/restaurantDetail", state: { name: this.props.name, menu: this.props.menu}}}>
                    <h5 className="restName"> {this.props.name} </h5>
                    <img className="restImg" src={this.props.img} alt="food picture"/>
                </Link>
            </div>
        );
    }
}