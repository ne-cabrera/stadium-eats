/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Orders } from "./orders";
import { Random } from "meteor/random";
import { assert } from "chai";
if(Meteor.isServer) {
  describe('Orders', () => {
    describe('methods', () => {
      const userId = Random.id();
      let orderId;
      beforeEach(() => {
        Orders.remove({});
      });
      it('can insert Order', () => {
        const insertOrder = Meteor.server.method_handlers["orders.insert"];
        const invocation = { userId };
        let prods = ["hola", "hola"],
          total = 1230,
          resName = "prueba",
          username = "name",
          locationT = { row: 12, stand: 12, sector: 12, sitnum: 123 };

        insertOrder.apply(invocation, [prods, total, resName, username, locationT]);
        assert.equal(Orders.find().count(), 1);
      });
      it("can change state", () => {
        const changeState = Meteor.server.method_handlers["orders.changeState"];
        invocation = { userId };
        orderId = Orders.insert({
          items: ["hola", "hola"],
          price: 1230,
          sector: 12,
          stand: 12,
          row: 12,
          sitnum: 12,
          clientId: userId,
          userName: "name",
          restaurantName: "hola2",
          state: "order received",
          createdAt: new Date()
        });
        changeState.apply(invocation, [orderId, "order preparing"]);
        assert.equal(Orders.find({ state: "order preparing" }).count(), 1);
      });
    });
  });
}