const assert = require('assert');

// mocha --require babel-core/register ./test/test-words.js
// TODO: この require したオブジェクトの default プロパティ取るのって正しくない気がする。。
const Words = require("../public/js/Words").default;

describe('Words', function() {
  describe('#get()', function() {
    it('should return [] when empty', function() {
      const words = new Words();
      assert.deepStrictEqual(words.get(), []);
    });
  });

  describe('#append()', function() {
    it('should append args when not exists same word', function() {
      const words = new Words();
      words.append("StarPlutinum", 999);
      assert.deepStrictEqual(words.get(), [{
        wordID: 0,
        text: "StarPlutinum",
        occurence: 999
      }]);
    });

    it('should add args.occurence to words.occurende when exists same word', function() {
      const words = new Words();
      words.append("The World", 500);
      words.append("The World", 500);
      assert.deepStrictEqual(words.get(), [{
        wordID: 0,
        text: "The World",
        occurence: 1000
      }]);
    });
  });

});
