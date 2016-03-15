/**
 * Created by Huang, Fuguo (aka Ken) on 15/03/2016.
 */
var app = require('http').createServer(connectionHandler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(8080);

function connectionHandler(req, res) {
    fs.readFile(__dirname + '/socketClient.html', function(err, data) {
        if (err) {
            res.write(500);
            return res.end('Error loading file');
        }

        res.writeHead(200);
        res.end(data);
    });
}

var members = [];
io.sockets.on('connection', function(socket) {
   socket.on('joined', function(data) {
      var member = data;
       member.id = socket.id;
       members.push(member);

       socket.broadcast.emit('joined', data);
       console.log(data.name, 'joined the room');
   });

    socket.on('message', function(data) {
       socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', function () {
        for(var i = 0; i < members.length; i++) {
            if (members[i].id === socket.id) {
                socket.broadcast.emit('disconnected', {
                    name: members[i].name
                });
            }
        }
    })
});