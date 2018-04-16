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
    "chats.insertChat"(owner, order){
        if(!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        var ch = Chats.find({$and: [{user: this.userId}, {resOwner: owner}, {orderId: order}]}).fetch();
        if( ch.length === 0)
        {
            Chats.insert({
                user: this.userId,
                resOwner: owner,
                orderId: order
            });
        }
    },
    "chats.findChat"(owner, order){
        if(!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        var ch = Chats.find({$and: [{user: this.userId}, {resOwner: owner}, {orderId: order}]}).fetch();
        return ch;
    },
    "chats.findChatRes"(user, order){
        if(!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        var ch = Chats.find({$and: [{user: user}, {resOwner: this.userId}, {orderId: order}]}).fetch();
        return ch;
    }
});