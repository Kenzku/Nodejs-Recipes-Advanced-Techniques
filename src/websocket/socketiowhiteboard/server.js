/**
 * Created by Huang, Fuguo (aka Ken) on 16/03/2016.
 */
var WebSocketServer = require('websocket').server,
    http = require('http'),
    sox = {},
    idex = 0;

var server = http.createServer(function(request, response) {
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
});

server.listen(8080);

ws = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(orgin) {
    return true;
}

var getNextId = (function () {
    var index = 0;
    return function () {
        return ++index;
    }
})(); // run the function

ws.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        request.reject(); // prevent random people connect
        console.log('rejected');
        return;
    }
    var connection = request.accept('draw-protocol', request.origin);

    connection.socketId = getNextId();
    connection.sendUTF('socketId_' + connection.socketId);
    console.log('connection.socketId', connection.socketId);

    sox[connection.socketId] = connection;

    connection.on('message', function(message){
       if (message.type === 'utf8') {
           sendToAll(JSON.parse(message.utf8Data), 'utf8');
       } else if (message.type === 'binary') {
           connection.sendBytes(message.binaryData);
       }
    });

    connection.on('close', function(reason, description) {
        delete sox[connection.socketId];
    });
});

function sendToAll(drawEvt, type) {
    for (var socket in sox) {
        if (type === 'utf8' && drawEvt.socketId !== socket) {
            sox[socket].sendUTF(JSON.stringify(drawEvt));
        }
    }
}