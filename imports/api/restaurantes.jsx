import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Restaurantes = new Mongo.Collection("restaurantes");


if(Meteor.isServer) {
    Meteor.publish("restaurantes", function restaurantesPublication() {
        return Restaurantes.find();
    });
}

Meteor.methods({
    "restaurantes.insert"(name, imgUrl, stadiumT) {
        check(name, String);
        check(imgUrl, String);
        userRole = Meteor.users.findOne(this.userId).profile.role;
        if(!this.userId || userRole !== "restaurant") {
            throw new Meteor.Error("not-authorized");
        }

        Restaurantes.insert({
            name: name,
            img: imgUrl,
            owner: this.userId,
            stadium: stadiumT,
            menu: []
        });

    },
    "restaurantes.insertMenu"(plate, restaurantId) {
        check(plate, Object);
        check(restaurantId, String);
        // restaurant = Meteor.Restaurantes.findOne(restaurantId);
        //if(restaurant.owner !== userId) {
        //throw new Meteor.Error("not-Authorized");
        //}
        Restaurantes.update(restaurantId, {
            $push: { menu: plate }
        });
    },
    "restaurantes.uploadPic"(pic) {
        check(pic, String);
        userRole = Meteor.users.findOne(this.userId).profile.role;
        if(!this.userId || userRole !== "restaurant") {
            throw new Meteor.Error("not-authorized");
        }
        Restaurantes.update({ owner: this.userId }, { $set: { img: pic } });
    }
});

