import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const ChatMsgs = new Mongo.Collection("chatMsgs");

if(Meteor.isServer) {
    Meteor.publish("chatMsgs", function chatMsgsPublication() {
        return ChatMsgs.find();
    });
}

Meteor.methods({
    "chatMsgs.insert"(senderId, text, chat){
        if(!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        t = {
            hour: hours,
            minute: minutes 
        };
        ChatMsgs.insert({
            sender: senderId,
            time: t,
            message: text,
            chatId: chat
        })
    }
})