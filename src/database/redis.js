/**
 * Created by ibm on 23/03/2016.
 */
var redis = require('redis'),
    client = redis.createClient();

client.on('error', function (err) {
    console.log('error: ', err);
})

client.set('key', 'value', redis.print);

client.hset('hash key', 'hashtest 1', 'some value', redis.print);

client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print);

client.hkeys('hash key', function (err, replies) {
    console.log(replies.length + ' replies: ');
    replies.forEach(function (reply, i) {
        console.log(' ' + i + ': ' + reply);
    });

    client.quit();
});

client.hgetall('hash key', function (err, replies) {
    replies.forEach(function (reply) {
        console.log(reply);
    });
});

client.get('key', function (err) {
    if (err) {
        console.log(err);
    }
    console.log(reply);
});
