import React from "react";
import RestaurantList from "../components/restaurants/RestaurantList.jsx";
import { withHistory, Link } from "react-router-dom";
import {HomeNav} from "../components/navs/HomeNav";
export default class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }
    login() {
        Meteor.logout((err) => {
            if(err) {
                console.log(err.reason);
            }
        });

    }
    register() {
        Meteor.logout((err) => {
            if(err) {
                console.log(err.reason);
            }
        });
    }
    render() {
        return (
            <div>
                <HomeNav onLogin={this.login} onRegister={this.register}/>
                <div className="container">
                    <header className="jumbotron my-4">
                        <h1 className="display-3">Welcome to Stadium Eats</h1>
                        <p className="lead">Be Happy eating what you like, enjoying your sport event</p>
                        <Link to="/signup" className="btn btn-primary btn-lg" onClick={this.register} >Register Now!</Link>
                    </header>
                </div>
                <div className="container">
                    <div className="container">
                        <h1>
              Restaurants
                        </h1>
                    </div>
                    <RestaurantList />
                </div>
            </div>
        );

    }
}