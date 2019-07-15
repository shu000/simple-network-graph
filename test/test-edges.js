// mocha --require babel-core/register ./test/test-edges.js
const assert = require("assert");
const Words = require("../public/js/Words").default;
const Edges = require("../public/js/Edges").default;

describe("Edges", function() {

  describe("#getAsVisEdges", function(){
    it("should return Array as inputs to Vis.js's setDataSet()", function() {
      const edges = new Edges();
      edges.append(1, 2, 30);
      assert.deepStrictEqual(edges.getAsVisEdges(), [{
        id: 0,
        from: 1,
        to: 2
      }]);
    });
  });

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

  describe("#initByKeywords()", function() {
    it("should append edges in accordance with arg", function() {
      const keywords = [
        { keyword: "Sunday Monday Tuesday", occurence:  10},
        { keyword: "Sunday Wednesday", occurence:  20},
        { keyword: "Monday Tuesday", occurence:  20}
      ];

      const words = new Words();
      words.initByKeywords(keywords)

      const edges = new Edges();
      edges.initByKeywords(keywords, words);

      assert.deepStrictEqual(edges.getAll(), [
        { edgeID: 0, wordIDs: [ 0, 1 ], coOccurence: 10 },
        { edgeID: 1, wordIDs: [ 0, 2 ], coOccurence: 10 },
        { edgeID: 2, wordIDs: [ 1, 2 ], coOccurence: 30 },
        { edgeID: 3, wordIDs: [ 0, 3 ], coOccurence: 20 },
      ]);
    });
  });
});
