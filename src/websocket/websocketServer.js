/**
 * Created by Huang, Fuguo (aka Ken) on 14/03/2016.
 */
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    WebSocketServer = require('websocket').server;

var server = http.createServer(function (req, res) {
    var urlParsed = url.parse(req.url, true, true);

    fs.readFile(urlParsed.path.split('/')[1], function(err, data){
       if(err){
           res.statusCode = 404;
           res.end(http.STATUS_CODES[404]);
       }
        res.statusCode = 200;
        res.end(data);
    });
}).listen(8080);

// create web socket server
var serverConfig = {
    httpServer: server,
    autoAcceptConnections: false
};

var wsserver = new WebSocketServer();
wsserver.mount(serverConfig);

wsserver.on('connect', function (connection) {
    console.log('connected');
    connection.send('yo');
});

wsserver.on('request', function(req){
    console.log('request');
    var connection = req.accept('echo-protocol', req.origin);

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log(message.utf8Data);
        } else if (message.type === 'binary') {
            console.log(message.binaryData);
        }
    });

    connection.on('close', function(reasonCode, description) {
       console.log('connnection closed', reasonCode, description);
    });
});

wsserver.on('close', function(conn, reason, description) {
   console.log('closing', reason, description);
});
