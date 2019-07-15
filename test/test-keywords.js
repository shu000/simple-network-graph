// mocha --require babel-core/register ./test/test-keywords.js
const assert = require("assert");
const Keywords = require("../public/js/Keywords_new").default;

describe("Keywords", function() {

  describe("#initByCSV", function() {
    it("should append keywords in accordance with arg", function() {
      const csv = "KEYWORD, OCCURENCE\nSunday Monday, 10\nTuesday, 20";

      const keywords = new Keywords();
      keywords.initByCSV(csv);

      assert.deepStrictEqual(keywords.getAll(), [
        {keyword: "Sunday Monday", occurence: 10},
        {keyword: "Tuesday", occurence: 20},
      ]);
    });
  });
  
});
