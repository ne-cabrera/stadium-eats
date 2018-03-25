import React from "react";
import {render} from "react-dom";
import {Meteor} from "meteor/meteor";
import {AppRoutes} from "../imports/routes";

Meteor.startup(()=> {
    render(<AppRoutes/>, document.getElementById("render-target"));
});
