/**
 * Created by Huang, Fuguo (aka Ken) on 11/03/2016.
 */
// handle incoming or outgoing url
var qs = require('querystring'),
    incomingQS = ['foo=bar&foo=baz',
        'trademark=%E2%82%A2',
        '%7BLOTR%7D=frodo%20baggins'],
    outgoingQS = {
        good : 'night',
        v: '0.10.28',
        hello: 'world with spaces'
    },
    newQS = qs.stringify(outgoingQS, '|', '~'); // & is | and = is ~

incomingQS.forEach(function (q) {
    console.log(qs.parse(q));
});


console.log(qs.stringify(outgoingQS));
console.log(newQS);

console.log(qs.parse(newQS));