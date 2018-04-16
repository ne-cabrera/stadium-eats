import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Restaurantes } from "../../../api/restaurantes";
import { Restaurant } from "./Restaurant";
//import { SelectStadium } from "./SelectStadium";
import {Session} from "meteor/session";
//import {LocationBtn} from "./LocationBtn";

class RestaurantList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stadium: "All"
        };
        this.onChange = this.onChange.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    onChange(stad) {
        Session.set("filtroEstadio", stad);
        this.setState({
            stadium: stad
        });
        console.log(stad);
    }

    getLocation(){
       /* var header = new Headers({
            "Access-Control-Allow-Origin":"*",
            "Content-Type": "multipart/form-data"
        });
        var a = { method: "GET",
            headers: header,
            mode: "cors",
            cache: "default" };
        fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA1hR7bNT1ZIhNGm1eHDGcXUPOB3bIMPo4", {
            method: "POST"
        }).then(r => r.json())
            .then(res =>{
                var latitud = res.location.lat;
                var longitud = res.location.lng;
                var acc = res.accuracy;
                fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitud + "," + longitud +"&radius=" + acc + 500 +"&type=stadium&key=AIzaSyA1hR7bNT1ZIhNGm1eHDGcXUPOB3bIMPo4", a)
                    .then( r2 => {
                        console.log(r2);
                        return r2.json();})
                    .then(res2 => {
                        var stName = res2.results[0].name;
                        console.log(stName);
                    });
            });*/
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.props.restaurants.map((d, i) =>
                        <Restaurant name={d.name} img={d.img} menu={d.menu} comment={d.comment} key={i} resOwn={d.owner} />
                    )}
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("restaurantes");
    var filt = Session.get("filtroEstadio");
    console.log(filt);
    if(filt === "All" || filt === undefined){
        return {
            restaurants: Restaurantes.find({}).fetch()
        };
    }
    else{
        return {
            restaurants: Restaurantes.find({ stadium: filt}).fetch()
        };
    }
})(RestaurantList);