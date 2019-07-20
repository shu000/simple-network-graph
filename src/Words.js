class Words {
  constructor() {
    this.words = [];
  }

  /**
   * return this.words
   * @return {Array.<Object>} this.words
   */
  getAll() {
    return this.words;
  }

  /**
   * return this.words
   * @return {Array.<Object>} this.words
   */
  getAllOrderByOccurence() {
    return this.words.sort((a, b) => {
      if (a.occurence > b.occurence) return -1
      else if (a.occurence < b.occurence) return 1
      else return 0;
    });
  }

  /**
   * return Array as Vis.js's Nodes
   * @return {Array.<Object>} input to Vis.js's setDataSet()
   */
  getAsVisNodes() {
    const len = this.words.length;
    return this.getAllOrderByOccurence().map((word, i) => {
      return {
        id: word.wordID,
        label: word.text,
        value: this.calcVisValueBy(word.occurence),
        scaling: {
          label: { enabled: true }
        }
      };
    });
  }

  calcVisValueBy(occurence) {
    const index = this.uniqueOccurences.findIndex(x => x === occurence);
    const percentage = ((index + 1) / this.uniqueOccurences.length) * 100;
    return valueRanks.find(x => percentage <= x.percentage).value;
  }

  /**
   * return wordID of text
   * @param  {string} text if same as it, return wordID
   * @return {number}      if found then wordID, else -1
   */
  getID(text) {
    const found = this.words.find(obj => obj.text === text);
    if (found === undefined) return -1;
    else return found.wordID;
  }

  /**
   * append a word to this.words as Object.
   * if the word already exists in this.words, just add occurence.
   * @param  {string} text      word's surface.
   * @param  {number} occurence number of word's occurence.
   */
  append(text, occurence) {
    const found = this.words.findIndex(obj => obj.text === text);
    if (found < 0) {
      this.words.push({
        wordID: this.words.length,
        text: text,
        occurence: occurence
      });
    } else {
      this.words[found].occurence += occurence;
    }
  }

  initByKeywords(keywords) {
    keywords.map(keyword => {
      const texts = keyword.keyword.replace("　", " ").split(" ");
      const occurence = keyword.occurence;
      texts.map(text => {
        this.append(text, occurence);
      });
    });

    this.initUniqueOccurences();
  }

  initUniqueOccurences() {
    const occurences = this.getAllOrderByOccurence().map(word => word.occurence);
    this.uniqueOccurences = [...new Set(occurences)];
  }
}

// if a word.occurence is top 20% of all this.uniqueOccurences, value = 10
const valueRanks = [
  { percentage:  20, value: 10 },
  { percentage:  40, value: 8 },
  { percentage:  60, value: 6 },
  { percentage:  80, value: 4 },
  { percentage: 100, value: 2 },
];

module.exports = Words;
