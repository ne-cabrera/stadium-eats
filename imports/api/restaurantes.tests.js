import { Meteor } from "meteor";
import { Random } from "meteor/random";
import { assert } from "chai";
import { Restaurantes } from "./restaurantes";

if(Meteor.isServer) {
  describe('Orders', () => {
    describe('methods', () => {
      const userId = Random.id();
      let restaurantId;
      beforeEach(() => {
        Restaurantes.remove({});
      });
      it("can insert restaurants", () => {
        const insertRestaurant = Meteor.server.method_handlers["restaurantes.insert"];
        const invocation = { userId };
        insertRestaurant.apply(invoaction, ["Hola", "fyghjkdfjkshfdkj1432423", "Campibn"]);
        assert.equal(Restaurantes.find().count(), 1);
      });
      it("can insert Menus", () => {
        const insertRestaurant = Meteor.server.method_handlers["restaurantes.insert"];
        const insertMenu = Meteor.server.method_handlers["restaurantes.insertMenu"];
        const invocation = { userId };
        restaurantId = insertRestaurant.apply(invoaction, ["Hola", "fyghjkdfjkshfdkj1432423", "Campibn"]);
        let plate = { algo: "eewr" };
        insertMenu.apply(invocation, [plate, restaurantId]);
        assert.equal(Restaurant.find({ menu: [] }).count(), 0);
      });
      it("can upload Image", () => {
        const uploadPic = Meteor.server.method_handlers["restaurantes.uploadPic"];
        const invocation = { userId };
        uploadPic.apply(invocation, ["243dfsfdsfsdf"]);
        assert.equal(Restaurant.find({ img: "243dfsfdsfsdf" }).count(), 0);
      });
    });
  });
}