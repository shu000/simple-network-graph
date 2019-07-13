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
    console.log("lines2keywords");

    const nodesAndEdges = this.keywords2nodeAndEdges(this.keywords);
    console.log("keywords2nodeAndEdges");
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
      if ( line === "" ) return;

      const splitted = line.split(",");
      const keyword = splitted[0];
      const numberOfOccurences = parseInt(splitted[1]);

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
    const dictLabel2Id = {};
    const data = {
      nodes: [],
      edges: []
    };

    for (let keyword of Object.keys(keywords)) {
      const words = keyword.replace("　", " ").split(" ");
      //const value = keywords[keyword];// TODO parcentagenige
      const value = 10;

      words.map((word, i) => {
        const id = data.nodes.length;

        // 新出ノードのみ追加
        if ( !(word in dictLabel2Id) ) {
          data.nodes.push(createNode(id, word, value));
          dictLabel2Id[word] = id;
        }

        // 新出エッジのみ追加
        if ( i > 0 ) {
          const from = dictLabel2Id[word];
          const to = dictLabel2Id[words[i - 1]];
          if ( !existsSameEdge(data.edges, from, to) ) {
            data.edges.push(createEdge(from, to));
          }
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

// TODO: ループ重すぎでしょこれ
function existsSameEdge(edges, id1, id2) {
  for (let edge of edges) {
    if ((edge.from === id1 && edge.to === id2) ||
        (edge.to === id1 && edge.from === id2)) {
      return true;
    }
  }
  return false;
}
