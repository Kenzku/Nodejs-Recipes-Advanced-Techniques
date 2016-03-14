/**
 * Created by Huang, Fuguo (aka Ken) on 14/03/2016.
 */
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    WebSocketServer = require('websocket').server;

var server = http.createServer(function (req, res) {
    var urlParsed = url.parse(req.url, true, true);

    fs.readFile(urlParsed.path.split('/')[1], function (err, data) {
        if (err) {
            res.statusCode = 404;
            res.end();
        }
        console.log(urlParsed.path.split('/')[1]);
        res.statusCode = 200;
        res.end();
    });
}).listen(8080);

var serverConfig = {
    httpServer: server,
    autoAcceptConnections: false
};

var wsserver = new WebSocketServer();

wsserver.mount(serverConfig);

wsserver.on('connect', function(connection) {
    connection.send('yo from server');
});

wsserver.on('request', function(req) {
    if (req.requestedProtocols === 'echo-protocol') { // if the protocol then we accept it
        var connection = req.accept('echo-protocol', req.origin);

        connection.on('message', function (message) {
           if (message.type === 'utf8') {
               var rt = JSON.parse(message.utf8Data);
               switch (rt.path) {
                   case 'route_a':
                       console.log('do something on route_a');
                       break;
                   case 'route_b':
                       console.log('route_b', rt);
                       break;
                   default:
                       console.log('something else');
                       break;
               }
           } else if (message.type === 'binary') {
               console.log(message.binaryData);
           }
        });

        connection.on('close', function(reasonCode, description) {
           console.log('connection closed', reasonCode, description);
        });
    } else {
        console.log('protocol not accepted');
    }
});

wsserver.on('close', function(conn, reason, description) {
    console.log('closing', reason, description);
});
