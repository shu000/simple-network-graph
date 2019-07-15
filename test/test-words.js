// mocha --require babel-core/register ./test/test-words.js

const assert = require("assert");
// TODO: この require したオブジェクトの default プロパティ取るのって正しくない気がする。。
const Words = require("../public/js/Words").default;

describe("Words", function() {
  describe("#getAll()", function() {
    it("should return [] when empty", function() {
      const words = new Words();
      assert.deepStrictEqual(words.getAll(), []);
    });
  });

  describe("#getID()", function() {
    it("should return wordID when exists searching word", function() {
      const words = new Words();
      words.append("StarPlutinum", 999);
      words.append("TheWorld", 500);
      assert.strictEqual(words.getID("TheWorld"), 1);
    });

    it("should return -1 when not exists searching word", function() {
      const words = new Words();
      words.append("StarPlutinum", 999);
      assert.strictEqual(words.getID("TheWorld"), -1);
    });
  });

  describe("#append()", function() {
    it("should append args when not exists same word", function() {
      const words = new Words();
      words.append("StarPlutinum", 999);
      assert.deepStrictEqual(words.getAll(), [{
        wordID: 0,
        text: "StarPlutinum",
        occurence: 999
      }]);
    });

    it("should add args.occurence to words.occurence when exists same word", function() {
      const words = new Words();
      words.append("TheWorld", 500);
      words.append("TheWorld", 500);
      assert.deepStrictEqual(words.getAll(), [{
        wordID: 0,
        text: "TheWorld",
        occurence: 1000
      }]);
    });
  });

  describe("#initByKeywords()", function() {
    it("should append words in accordance with arg", function() {
      const keywords = [
        { keyword: "Sunday", occurence: 99},
        { keyword: "Monday Tuesday", occurence:  10},
        { keyword: "Tuesday Wednesday", occurence:  20}
      ];

      const words = new Words();
      words.initByKeywords(keywords);
      assert.deepStrictEqual(words.getAll(), [
        { wordID: 0, text: "Sunday", occurence: 99 },
        { wordID: 1, text: "Monday", occurence: 10 },
        { wordID: 2, text: "Tuesday", occurence: 30 },
        { wordID: 3, text: "Wednesday", occurence: 20 }
      ]);
    });
  });

  describe("#getAllOrderByOccurence()", function() {
    it("should return Array sorted by occurence", function() {
      const keywords = [
        { keyword: "Sunday", occurence: 99},
        { keyword: "Monday Tuesday", occurence:  10},
        { keyword: "Tuesday Wednesday", occurence:  20}
      ];

      const words = new Words();
      words.initByKeywords(keywords);
      assert.deepStrictEqual(words.getAllOrderByOccurence(), [
        { wordID: 0, text: "Sunday", occurence: 99 },
        { wordID: 2, text: "Tuesday", occurence: 30 },
        { wordID: 3, text: "Wednesday", occurence: 20 },
        { wordID: 1, text: "Monday", occurence: 10 }
      ]);
    });
  });

  describe("#getAsVisNodes()", function() {
    it("should return Array as inputs to Vis.js's setDataSet()", function() {
      const words = new Words();
      words.append("StarPlutinum", 999);
      assert.deepStrictEqual(words.getAsVisNodes(), [{
        id: 0,
        label: "StarPlutinum",
        value: 999,
        scaling: {
          label: { enabled: true }
        }
      }]);
    });
  });
});
