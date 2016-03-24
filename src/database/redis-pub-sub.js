/**
 * Created by ibm on 24/03/2016.
 */
var redis = require('redis'),
    subscriber = redis.createClient(),
    publisher = redis.createClient();

subscriber.on('subscribe', function (topic, count) {
    publisher.publish('event topic', 'your event has occured');
});

subscriber.on('message', function (topic, message) {
    console.log('message received::' + topic + ':' + message);
    subscriber.end();
    publisher.end();
});

subscriber.subscribe('event topic');