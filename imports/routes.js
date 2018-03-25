import React, {Component} from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import App from "./ui/App";
import {Prueba} from "./ui/prueba";
import {ListaRestaruantes} from "./ui/components/ListaRestaurantes"

export const AppRoutes = () =>
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={ListaRestaruantes}/>
            </Switch>
        </App>
    </BrowserRouter>
    ;
