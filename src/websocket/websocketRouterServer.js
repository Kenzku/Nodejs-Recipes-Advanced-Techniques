/**
 * Created by Huang, Fuguo (aka Ken) on 15/03/2016.
 */
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    WebSocketServer = require('websocket').server,
    WebSocketRouter = require('websocket').router;

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

var router = new WebSocketRouter();
router.attachServer(wsserver); // attach to the web socket server

router.mount('*', 'echo-protocol', function(request) {
   console.log('mounted to the echo protocol');
    var conn = request.accept(request.origin);

    conn.on('message', function(message) {
        console.log('routed message');
    });

    conn.send('hey');
});

router.mount('*', 'update-protocol', function(request) {
    console.log('mounted to the update protocol');
    var conn = request.accept(request.origin);

    conn.on('message', function (message) {
       console.log('update things');
    });
});