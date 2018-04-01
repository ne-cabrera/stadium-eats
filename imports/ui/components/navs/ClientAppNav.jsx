import React, { Component } from "react";
import {Link} from "react-router-dom";

export class ClientAppNav extends Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onClick();
    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <Link to="/" className="navbar-brand">Stadium Eats</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item ">
                                    <Link to="/Home" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/myOrders"> Orders</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link" onClick={this.handleClick}>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}