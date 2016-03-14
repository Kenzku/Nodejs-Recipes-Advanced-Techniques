/**
 * Created by Huang, Fuguo (aka Ken) on 14/03/2016.
 */
// parsing url you need to handle .auth, .hash, .host, .hostname, .href, .path
// .pathname, .port, .protocal, .query, .search

var url = require('url'),
    theUrl = 'http://who:ami@hostname:1234/a/b/c/d/?d=e#f=g',
    urlParsed = url.parse(theUrl, true, true);

console.log('protocol', urlParsed.protocol);
console.log('slashes', urlParsed.slashes);
console.log('auth', urlParsed.auth);
console.log('host', urlParsed.host);
console.log('port', urlParsed.port);
console.log('hostname', urlParsed.hostname);
console.log('hash', urlParsed.hash);
console.log('search', urlParsed.search);
console.log('query', urlParsed.query);
console.log('pathname', urlParsed.pathname);
console.log('href', urlParsed.href);

console.log(url.format(urlParsed));
console.log(url.resolve('/a/b/c/', 'd'));