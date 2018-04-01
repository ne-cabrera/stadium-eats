import React from "react";
import MenuRestaurant from "./MenuRestaurant";
import { Restaurantes } from "../../../api/restaurantes";
import { withTracker } from "meteor/react-meteor-data";
import {RestaurantAppNav} from "../navs/RestaurantAppNav";

class MyMenu extends React.Component {

    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        Meteor.logout((err) => {
            if(err) {
                console.log(err.reason);
            }
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        let name = document.getElementById("plate-name").value;
        let nprice = parseInt(document.getElementById("plate-price").value);
        let ningredients = document.getElementById("plate-ingredients").value;
        let nImg = document.getElementById("plate-img").value;
        let id = this.props.restaurants[0]._id;
        let plate = {
            plateName: name,
            price: nprice,
            ingredients: ningredients,
            img: nImg
        };
        Meteor.call("restaurantes.insertMenu", plate, this.props.restaurants[0]._id);
        document.getElementById("plate-name").value = "";
        document.getElementById("plate-price").value = "";
        document.getElementById("plate-ingredients").value = "";
    }

    render() {
        console.log(this.props.restaurants[0], "este soy yo");
        return (
            <div>
                <RestaurantAppNav onClick={this.logout}/>
                <div>
                    <div className="container padUp">
                        <h1>Your Menu</h1>
                    </div>
                    <div className="container pad">
                        <div className="row">
                            <div className="container  col-lg-6 padUp">
                                {this.props.restaurants[0].menu.map((d, i) =>
                                    <MenuRestaurant plateName={d.plateName} ingredients={d.ingredients} price={d.price} key={i} />)
                                }
                            </div>
                            <div className="container col-lg-5 padUp">
                                <div className="row">
                                    <h3 className="padLeft">Add Plate to your Menu</h3>

                                </div>
                                <div className="row">
                                    <hr />
                                    <form id="login-form" className="form col-md-12 center-block" >
                                        <div className="form-group">
                                            <input type="text" id="plate-name" className="form-control input-lg" placeholder="Plate Name" />
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control" name="ingredients" id="plate-ingredients" cols="47" rows="2" placeholder="Ingredients"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" id="plate-img" className="form-control input-lg" placeholder="Plate Image" />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" id="plate-price" className="form-control input-lg" placeholder="Price" />
                                        </div>
                                        <div className="form-group text-center">
                                            <input type="submit" id="add-button" className="btn btn-dark btn-lg btn-block" value="Add!" onClick={this.handleSubmit.bind(this)} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("restaurantes");
    let owId = sessionStorage.getItem("id");
    return {
        restaurants: Restaurantes.find({ owner: owId }).fetch(),
    };
})(MyMenu);