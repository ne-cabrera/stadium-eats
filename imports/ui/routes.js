import React, {Component} from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import App from "./App";
import {Prueba} from "./prueba";
import RestaurantList from "./components/restaurants/RestaurantList"

export const AppRoutes = () =>
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={RestaurantList}/>
            </Switch>
        </App>
    </BrowserRouter>
    ;
