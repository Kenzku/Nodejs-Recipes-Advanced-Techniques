/**
 * Created by Huang, Fuguo (aka Ken) on 11/03/2016.
 */
/**
 * balance load on a server through multiple modules
 * use the multiple cores on the machines to handle the load more efficiently
 */
var cluster = require('cluster'),
    cpuCount = require('os').cpus().length;

cluster.setupMaster({ // tell what to execute
    exec: 'worker.js'
});


if (cluster.isMaster) {
    for(var i = 0; i < cpuCount; i++) {
        cluster.fork(); // new process
    }
    cluster.on('fork', function (worker) {
        console.log(worker.id + ' work is forked'); // my macbook air has 4 cores
    });
    cluster.on('listening', function (worker, address) {
        console.log(worker.id + ' is listening on ' + address);
    });
    cluster.on('online', function(worker) {
        console.log(worker.id + ' is online');
    });
    cluster.on('disconnect', function(worker) {
        console.log(worker.id + ' is disconnected');
    });

    cluster.on('exit', function (worker) {
       console.log(worker.id + ' died');
    });
}