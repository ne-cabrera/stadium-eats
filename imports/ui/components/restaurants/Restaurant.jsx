import React, { Component } from "react";
import { withHistory, Link } from "react-router-dom";

export class Restaurant extends Component {

  
    render() {
        return (
            <div className="col-lg-4 restContainer">
                <div className="card">
                    <Link to={{ pathname: "/restaurantDetail", state: { name: this.props.name, menu: this.props.menu } }}>
                        <img className="restImg card-img-top" src={this.props.img} alt="Restaurant Logo or picture" />
                    </Link>
                    <div className="card-body">
                        <Link to={{ pathname: "/restaurantDetail", state: { name: this.props.name, menu: this.props.menu } }}>
                            <h4 className="card-title restName"> {this.props.name} </h4>
                        </Link>
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo magni sapiente, tempore debitis beatae culpa natus architecto.</p>
                    </div>
                </div>

            </div>
        );
    }
}