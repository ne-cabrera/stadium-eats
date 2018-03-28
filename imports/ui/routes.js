import React, {Component} from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import App from "./App";
import {Prueba} from "./prueba";
import RestaurantList from "./components/restaurants/RestaurantList"
import {RestaurantDetail} from "./components/restaurants/RestaurantDetail"

export const AppRoutes = () =>
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={RestaurantList}/>
                <Route exact path="/restaurantDetail" component={RestaurantDetail}/>
            </Switch>
        </App>
    </BrowserRouter>
    ;
