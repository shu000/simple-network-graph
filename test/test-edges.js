// mocha --require babel-core/register ./test/test-edges.js
const assert = require("assert");
const Edges = require("../public/js/Edges").default;

describe("Edges", function() {
  describe("#append()", function() {
    it("should append args when not exists same edge", function() {
      const edges = new Edges();
      edges.append(1, 2, 30);
      assert.deepStrictEqual(edges.getAll(), [{
        edgeID: 0,
        wordIDs: [1, 2],
        coOccurence: 30
      }]);
    });

    it("should add args.coOccurence to edges.coOccurence when exists same edge", function() {
      const edges = new Edges();
      edges.append(1, 2, 30);
      edges.append(1, 2, 30);
      assert.deepStrictEqual(edges.getAll(), [{
        edgeID: 0,
        wordIDs: [1, 2],
        coOccurence: 60
      }]);
    });

    it("should judge that they are same edge, when swap id", function() {
      const edges = new Edges();
      edges.append(1, 2, 30);
      edges.append(2, 1, 30);
      assert.deepStrictEqual(edges.getAll(), [{
        edgeID: 0,
        wordIDs: [1, 2],
        coOccurence: 60
      }]);
    });
  });
});
