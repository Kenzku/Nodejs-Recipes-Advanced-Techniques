/**
 * Created by Huang, Fuguo (aka Ken) on 11/03/2016.
 */
var net = require('net'),
    connection;

connection = net.createConnection({port: 8181, host: 'localhost'},
    function(){
    console.log('connection successful');
});

connection.on('error', function(err) {
  console.log(err);
});

connection.on('close', function(){
   console.log('connection closed');
});

connection.on('data', function() {
    console.log(data.toString());
})