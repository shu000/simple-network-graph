export default class Words {
  constructor() {
    this.words = [];
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

  /**
   * return this.words
   * @return {Array.<Object>} this.words
   */
  get() {
    return this.words;
  }
}
