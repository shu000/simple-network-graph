const CsvReader = {
  read: (text) => {
    const words = {

    };

    const lines = text.split("\n");

    // ヘッダーを読み飛ばす
    lines.shift();

    lines.map(function(line) {
      const splitted = line.split(",");
      const keywords = line[0];
      const occurences = 0 + line[1];
    });
    console.log(lines);
  }
};
