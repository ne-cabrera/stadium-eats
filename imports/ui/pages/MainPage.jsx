import React, { Component } from "react";
import { withHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import RestaurantList from "../components/restaurants/RestaurantList.jsx";
import { HeaderRestaurant } from "../components/HeaderRestaurant";
export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }
    logoutThis(e) {
        e.preventDefault();
        this.props.logout(e);
    }


    render() {
        let currentUser = this.props.currentUser;
        let userDataAvailable = (currentUser !== undefined);
        let loggedIn = (currentUser && userDataAvailable);
        return (
            <div>
                <div className="container padUp">
                    <h1 className="text-center">{loggedIn ? "Welcome " + this.props.currentUser : ""}</h1>
                </div>
                <div>
                    <RestaurantList />
                </div>
            </div>
        );
    }
}

MainPage.propTypes = {
    username: PropTypes.string
};