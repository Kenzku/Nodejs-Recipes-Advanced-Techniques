/**
 * Created by ibm on 24/03/2016.
 */
// npm install mocha

var assert = require('assert');

var three = 3;

describe('useMocha', function () { // suite
    describe('#equal', function () { // describe one test
        it('should return true that 3 equals 3', function () {
            assert.equal(three, '3', '3 equals "3"');
        });
    });
    describe('#strictEqual', function () { // describe another test
        it('"3" only strictly equals 3.toString()', function () {
            assert.strictEqual('3', three.toString(), '3 and "3" are not strictly euqal');
        });
    });
    describe('#ok', function () {
        it('should return that false is not truthy', function () {
            assert.ok(false, 'not truthy'); // this will fail
        });
    });
});

// mocha useMocha.js

// async test pattern

var squareAsync = function (a, callback) {
    result = a * a;
    callback(result);
}

squareAsync(three, function (result) {
    assert.equal(result, 9, '3 squared is nine');
})