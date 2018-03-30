import { Mongo } from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import { check } from "meteor/check";


export const Orders = new Mongo.Collection("orders");
Meteor.methods({
    "orders.insert"(prods, total, resName){
        if(! this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        Orders.insert({
            items: prods,
            price: total,
            clientId: this.userId,
            restaurantName: resName,
            state: "order received"
        });
    }
});