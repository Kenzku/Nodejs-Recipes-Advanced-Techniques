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
var conns = [];
wsserver.on('connect', function (connection) {
    console.log('connected');
    conns.push(connection); // adding each connection to the array when there is a connection
    connection.send('yo');
    setInterval(pingClients, 5e3);
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
    for (var i = 0; i < conns.length; i++) {
        if (conn[i] === conn) {
            conn[i].splice(i, 1); // get rid of that connection
        }
    }
});


function pingClients() {
    for (var i = 0; i< conns.length; i ++) {
        conns[i].send('ping');
    }
}