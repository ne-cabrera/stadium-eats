import React, {Component} from "react";
import {Redirect} from "react-router-dom";

export class Location extends Component{

    constructor(props){
        super(props);
        this.state={
            lacation: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
    }

    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    handleSubmit(){
        var stadium = document.getElementById("stadium").value;
        var sector = document.getElementById("sector").value;
        var seat = document.getElementById("silla").value;
        var row = document.getElementById("fila").value;
        var obj = {};
        obj.stadium = stadium;
        obj.sector = sector;
        obj.seat = seat;
        obj.row = row;
        localStorage.setItem("location", JSON.stringify(obj));
        this.setState({
            location: obj
        })
    }

    render(){
        return(
            <div>
                {this.isEmpty(this.state.location)? <div></div> : <Redirect to="/Home"/> }
                <h2>Tell us your location</h2>
                <form onSubmit={this.handleSubmit}>
                    <select id="stadium">
                        <option value="Estadio Nemesio Camacho El Campín">Estadio Nemesio Camacho El Campín</option>
                        <option value="Estadio Metropolitano de Techo">Estadio Metropolitano de Techo</option>
                        <option value="La Caneca">La Caneca</option>
                    </select>
                    <select id="sector">
                        <option value="norte">Norte</option>
                        <option value="sur">Sur</option>
                        <option value="occidental">Occidental</option>
                        <option value="oriental">Oriental</option>
                    </select>
                    sector: <input type="text" maxLength="1" id="fila"/>
                    seat: <input type="number" id="silla"/>
                    <input type="submit" id="login-button" className="btn btn-dark btn-lg btn-block" value="Search Restaurants" />
                </form>
            </div>
            
        );
    }
}