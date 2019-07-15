export default class Edges {
  constructor() {
    this.edges = [];
  }

  /**
   * return this.edges
   * @return {Array.<Object>} [description]
   */
  getAll() {
    return this.edges;
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

  getAsVisEdges() {
    const edges = [];
    this.edges.map(edge => {
      edges.push({
        from: wordIDs[0],
        to: wordIDs[1]
      });
    });
    return edges;
  }
}
