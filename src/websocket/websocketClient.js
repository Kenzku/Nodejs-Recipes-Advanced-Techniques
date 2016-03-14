/**
 * Created by Huang, Fuguo (aka Ken) on 14/03/2016.
 */
var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ', error.toString());
});

client.on('connect', function(connection) {
    console.log('woot: Web socket client conneceted');
    connection.on('error', function(error) {
       console.log(error);
    });
    connection.on('close', function() {
       console.log('echo-protocol connection closed');
    });

    connection.on('message', function(message){
        switch (message.type) {
            case 'utf8':
                console.log('from server: ', message.utf8Data);
                break;
            default:
                console.log(JSON.stringify(message));
                break;
        }
    });
    connection.send('heyo');
});

client.connect('ws://localhost:8080', 'echo-protocol');