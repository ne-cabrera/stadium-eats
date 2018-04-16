import React, { Component } from "react";
import { withHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import RestaurantList from "../components/restaurants/RestaurantList.jsx";
import { HeaderRestaurant } from "../components/HeaderRestaurant";
import { HeaderLocation } from "../components/Headers/HeaderLocation";
import HeaderClient from "../components/Headers/HeaderClient";
import { Session } from "meteor/session";
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
        let location = Session.get("Estadio");
        console.log(location);
        return (
            <div>
                {(location === undefined || location === "") ? <HeaderLocation /> : <HeaderClient />}
                <div className="container padUp">
                    <h1>These are the restaurantes near you</h1>
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