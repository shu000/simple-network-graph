class Keywords {

  constructor(csv) {
    if (!csv) return;
    this.keywords = {};
    this.initByCSV(csv);
  }

  /**
   * [initByCSV description]
   * @param  {Array.<string>} csv [description]
   * @return {[type]}     [description]
   */
  initByCSV = (csv) => {
    if (!csv) return;
    if (!this.keywords) this.keywords = {};

    const lines = csv.split("\n");
    const linesWithNoHeader = this.throwAwayHeader(lines);

    linesWithNoHeader.map(line => {
      const splitted = line.split(",");
      const keyword = splitted[0];
      const numberOfOccurences = 0 + splitted[1];

      if (this.keywords[keyword] > 0) {
        this.keywords[keyword] += numberOfOccurences;
      } else {
        this.keywords[keyword] = numberOfOccurences;
      }
    });

    console.log(this.keywords);
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
};
