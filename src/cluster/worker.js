/**
 * Created by Huang, Fuguo (aka Ken) on 11/03/2016.
 */
var http = require('http');

http.createServer(function(req, res) {
   console.log(req.url);
    res.writeHead(200);
    res.end('Hello');
}).listen(8080);

