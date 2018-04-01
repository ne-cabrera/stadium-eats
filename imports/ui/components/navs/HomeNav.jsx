import React, {Component} from "react";
import {Link} from "react-router-dom";

export class HomeNav extends Component{

    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(){
        this.props.onLogin();
    }

    handleRegister(){
        this.props.onRegister();
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="#">Stadium Eats</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item">
                                <Link to="/login" className="nav-link" onClick={this.handleLogin}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link" onClick={this.handleRegister}>Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}