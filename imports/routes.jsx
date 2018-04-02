import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// containers
import App from "./ui/App.jsx";


// pages
import SignupPage from "./ui/pages/SingupPage.jsx";
import LoginPage from "./ui/pages/LoginPage.jsx";
import HomePage from "./ui/pages/HomePage.jsx";
import SignupRestaurant from "./ui/pages/SingupRestaurant.jsx";
import { RestaurantDetail } from "./ui/components/restaurants/RestaurantDetail.jsx";
import MyMenu from "./ui/components/restaurants/MyMenu.jsx";
import RestaurantListPage from "./ui/pages/RestaurantListPage";
import OrdersList from "./ui/components/clientOrders/OrdersList";
import {Location} from "./ui/components/location/Location";

export const AppRoutes = () => (
    <Router>
        <div>
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/restaurantDetail" component={RestaurantDetail} />
            <Route path="/restaurants" component={RestaurantListPage} />
            <Route path="/signupRestaurant" component={SignupRestaurant} />
            <Route path="/Home" component={App}/>
            <Route path="/myMenu" component={MyMenu} />
            <Route path="/myOrders" component={OrdersList} />
            <Route path="/location" component={Location}/>
            <Route exact path="/" render={()=>{
                console.log(Meteor.userId());
                console.log(localStorage.getItem("location"));
                if(localStorage.getItem("location") === null && Meteor.userId() !== null){
                    return <Redirect to="/location"/>;
                }
                else{
                    return (Meteor.userId() === null ? (<HomePage />) : (<Redirect to="/Home"/>));
                }
                
            }
            } />
        </div>
    </Router>
);
