import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Restaurantes } from "../../../api/restaurantes";
import { Restaurant } from "./Restaurant";

class RestaurantList extends Component {

    go(e) {
        e.preventDefault();
        Meteor.logout((err) => {
            if(err) {
                console.log(err.reason);
            } else {
                this.props.history.push({ pathname: "/restaurantDetail", state: { name: this.props.name, menu: this.props.menu } });
            }
        });
        this.props.history.push({ pathname: "/restaurantDetail", state: { name: this.props.name, menu: this.props.menu } });
    }

    render() {
        console.log(this.props.restaurants);
        return (
            <div className="container">
                <div className="row">
                    {this.props.restaurants.map((d, i) =>
                        <Restaurant name={d.name} img={d.img} menu={d.menu} key={i} go={this.go.bind(this)} />
                    )}
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("restaurantes");

    return {
        restaurants: Restaurantes.find({}).fetch()
    };
})(RestaurantList);