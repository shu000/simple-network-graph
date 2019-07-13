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

    console.log(this.lines2wordsOrderByOccurences(linesWithNoHeader));

    const keywords = this.lines2keywords(linesWithNoHeader);
    const nodesAndEdges = this.keywords2nodeAndEdges(keywords);

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

  lines2wordsOrderByOccurences(lines) {
    const words = [];
    lines.map(line => {
      if ( line === "" ) return;

      const splitted = line.split(",");
      const keyword = splitted[0];
      const wordsInKeyword = keyword.replace("　", " ").split(" ");
      const numberOfOccurences = parseInt(splitted[1]);

      wordsInKeyword.map(word => {
        // 新出単語ならば追加
        // 既出単語なら出現回数を加算
        const index = words.findIndex(obj => obj.word === word);
        if (index < 0) {
          words.push({
            word: word,
            occurences: numberOfOccurences
          });
        } else {
          words[index].occurences += numberOfOccurences;
        }
      });
    });

    // 出現回数降順に並び替えてから返す
    return words.sort((a, b) => {
      if (a.occurences > b.occurences) return -1;
      else return 1;
    });
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
