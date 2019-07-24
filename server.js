var http = require('http');
var fs   = require('fs');
var path = require('path');
var mime = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js": "text/javascript"
};

var http_server = new http.createServer(function(req, res) {

  console.log(req.url);

  if (req.url == '/') {
    filePath = '/public/index.html';
  }
  else if (req.url == '/dist/bundle.js') {
    filePath = req.url;
  }
  else {
    filePath = '/public' + req.url;
  }

  const fullPath = __dirname + filePath;

  res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
  fs.readFile(fullPath, function(err, data) {
    if (err) {
      // エラー時の応答
      res.end('I have an error... ' + err.toString(), 'UTF-8');
    } else {
      res.end(data, 'UTF-8');
    }
  });
}).listen(8000);
console.log('Server running at http://localhost:8000/');
