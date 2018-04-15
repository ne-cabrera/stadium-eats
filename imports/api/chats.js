import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Chats = new Mongo.Collection("chats");

if(Meteor.isServer) {
    Meteor.publish("chats", function chatsPublication() {
        return Chats.find();
    });
}

Meteor.methods({
    "chats.insertChat"(deliveryMan){
        if(!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        var ch = Chats.find({$and: [{user: this.userId}, {delivery: deliveryMan}]}).fetch();
        if( ch.length === 0)
        {
            Chats.insert({
                user: this.userId,
                delivery: deliveryMan
            });
        }
    },
    "chats.findChat"(del){
        if(!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        var ch = Chats.find({$and: [{user: this.userId}, {delivery: del}]}).fetch();
        return ch;
    }
});