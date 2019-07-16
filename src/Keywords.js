class Keywords {
  constructor() {
    this.keywords = [];
  }

  getAll() {
    return this.keywords;
  }

  initByCSV(csv) {
    const lines = throwAwayHeader(csv.split("\n"));
    this.keywords = lines
      .map(line => {
        if ( line === "" ) return;

        const splitted = line.split(",");
        const keyword = splitted[0];
        const occurence = parseInt(splitted[1]);

        return {
          keyword: keyword,
          occurence: occurence
        };
      })
      .filter(x => x);
  }

}

/**
 * CSVのヘッダ行を捨てる
 * CSVの行が "[string], [number]" であることを前提として、
 * 1行目の2列目が number でなかった場合のみ捨てる。
 * @param  {[Array.<string>]} lines CSVの全行
 * @return {[Array.<string>]}       ヘッダを除いたCSV
 */
function throwAwayHeader(lines) {
  // 最初の行の2列目の値が数字でなかった場合のみ、ヘッダ行とみなして捨てる
  if (lines[0].split(",")[1].trim().match(/[^0-9]+/)) {
    lines.shift();
    return lines;
  }

  return lines;
}

module.exports = Keywords;
