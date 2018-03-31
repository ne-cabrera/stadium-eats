import React from "react";
import MenuRestaurant from "./MenuRestaurant";
import { Restaurantes } from "../../../api/restaurantes";
import { withTracker } from "meteor/react-meteor-data";

class MyMenu extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    let name = document.getElementById("plate-name").value;
    let nprice = document.getElementById("plate-price").value;
    let ningredients = document.getElementById("plate-ingredients").value;
    let id = this.props.restaurants[0]._id;
    let plate = {
      plateName: name,
      price: nprice,
      ingredients: ningredients
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
        <div>
          <nav className="navbar navbar-expand-md  navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Stadium Eats</a>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <a href="#" className="nav-link" >Home</a>
              </li>
            </ul>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav navbar-right">
                <a className="nav-item nav-link " href="#" >Logout</a>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <div className="container">
            <div className="row">
              <div className="container menuContainer col-lg-5">
                {this.props.restaurants[0].menu.map((d, i) =>
                  <MenuRestaurant plateName={d.plateName} ingredients={d.ingredients} price={d.price} key={i} />)
                }
              </div>
              <div className="container col-lg-5">
                <div className="row">
                  <h3>Add Plate to your Menu</h3>

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