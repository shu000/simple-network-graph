class Edges {
  constructor() {
    this.edges = [];
    this.top10edges = {};
  }

  /**
   * return this.edges
   * @return {Array.<Object>} [description]
   */
  getAll() {
    return this.edges;
  }

  /**
   *
   * @param  {[type]} wordID [description]
   * @param  {[type]} count  [description]
   * @return {[type]}        [description]
   */
  getTopEdges(wordID, count) {
    return this.edges
      .filter(edge => edge.wordIDs.includes(wordID))
      .sort((a, b) => {
        if (a.coOccurence > b.coOccurence) return -1;
        else if (a.coOccurence < b.coOccurence) return 1;
        else return 0;
      })
      .slice(0, count);
  }

  /**
   * return Array as Vis.js's Edges
   * @return {Array.<Object>} input to Vis.js's setDataSet()
   */
  getAsVisEdges() {
    const edges = [];
    this.edges.map(edge => {
      edges.push({
        id: edge.edgeID,
        from: edge.wordIDs[0],
        to: edge.wordIDs[1]
      });
    });
    return edges;
  }

  /**
   * append an edge to this.edges as Object
   * if the edge already exists in this.edges, just add coOccurence.
   * @param  {number} id1         wordID
   * @param  {number} id2         wordID
   * @param  {number} coOccurence co-occurence of id1 and id2
   */
  append(id1, id2, coOccurence) {
    const foundIndex = this.edges.findIndex(edge => {
      return edge.wordIDs.includes(id1) && edge.wordIDs.includes(id2);
    });

    if (foundIndex < 0) {
      this.edges.push({
        edgeID: this.edges.length,
        wordIDs: [id1, id2],
        coOccurence: coOccurence
      });
    } else {
      this.edges[foundIndex].coOccurence += coOccurence;
    }
  }

  initByKeywords(keywords, words) {
    keywords.map(keyword => {
      const texts = keyword.keyword.replace("　", " ").split(" ");
      const occurence = keyword.occurence;

      if (texts.length === 2) this.append(words.getID(texts[0]),
                                          words.getID(texts[1]),
                                          occurence);
      if (texts.length > 2) {
        const combinations = combination(texts);
        combinations.map(texts => {
          this.append(words.getID(texts[0]),
                      words.getID(texts[1]),
                      occurence);
        })
      }
    });
  }
}

/**
 * get combinations of array's items
 *   e.g.) combination([1, 2, 3]) => [[1, 2], [1, 3], [2, 3]]
 * @param  {[Array} array be combinationed
 * @return {Array}       combinations
 */
function combination(array) {
  if (array.length === 1) {
    return [];
  }
  else if (array.length === 2) {
    return [array];
  }
  else {
    const head = array.shift();
    return array.map(item => [head, item]).concat(combination(array));
  }
}

module.exports = Edges;
