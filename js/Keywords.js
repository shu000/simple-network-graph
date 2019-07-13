class Keywords {

  constructor(csv) {
    if (!csv) return;

    this.keywords = {};
    this.nodes = [];
    this.edges = [];

    this.initByCSV(csv);
  }

  /**
   * [initByCSV description]
   * @param  {Array.<string>} csv [description]
   * @return {[type]}     [description]
   */
  initByCSV = (csv) => {
    if (!csv) return;

    const lines = csv.split("\n");
    const linesWithNoHeader = this.throwAwayHeader(lines);

    this.keywords = this.lines2keywords(linesWithNoHeader);

    const nodesAndEdges = this.keywords2nodeAndEdges(this.keywords);
    console.log(nodesAndEdges);
    this.nodes = nodesAndEdges.nodes;
    this.edges = nodesAndEdges.edges;
  };

  /**
   * CSVのヘッダ行を捨てる
   * CSVの行が "[string], [number]" であることを前提として、
   * 1行目の2列目が number でなかった場合のみ捨てる。
   * @param  {[Array.<string>]} lines CSVの全行
   * @return {[Array.<string>]}       ヘッダを除いたCSV
   */
  throwAwayHeader(lines) {
    // 最初の行の2列目の値が数字でなかった場合のみ、ヘッダ行とみなして捨てる
    if (lines[0].split(",")[1].match(/[^0-9]+/)) {
      lines.shift();
      return lines;
    }

    return lines;
  }

  /**
   * [lines2keywords description]
   * @param  {Array.<string>} lines [description]
   * @return {Object}       [description]
   */
  lines2keywords(lines) {
    const keywords = {};
    lines.map(line => {
      const splitted = line.split(",");
      const keyword = splitted[0];
      const numberOfOccurences = 0 + splitted[1];

      if (keywords[keyword] > 0) {
        keywords[keyword] += numberOfOccurences;
      } else {
        keywords[keyword] = numberOfOccurences;
      }
    });

    return keywords;
  }

  /**
   * [keywords2nodeAndEdges description]
   * @param  {[type]} keywords [description]
   * @return {[type]}          [description]
   */
  keywords2nodeAndEdges(keywords) {
    const data = {
      nodes: [],
      edges: []
    };

    for (let keyword of Object.keys(keywords)) {
      const words = keyword.replace("　", " ").split(" ");
      //const value = keywords[keyword];// TODO parcentagenige
      const value = 10;

      const allWords = [];
      words.map((word, i) => {
        const id = data.nodes.length;

        if (allWords.indexOf(word) < 0) {
          data.nodes.push(createNode(id, word, value));
          allWords.push(word);
        }
        else {
          console.log("Hit");
          console.log(word);
        }

        // 他の単語が存在するときは i > 0
        if (i > 0) {
          data.edges.push(createEdge(id - 1, id));
        }
      });
    }

    return data;
  }
};

function createNode(id, label, value) {
  return {
    id: id,
    label: label,
    value: value,
    scaling: {
      label: { enabled: true }
    }
  };
}

function createEdge(from, to) {
  return {
    from: from,
    to: to
  };
}
