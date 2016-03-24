/**
 * Created by ibm on 24/03/2016.
 */
var assert = require('assert');

var three = 3;

assert.equal(three, '3', '3 equals 3'); // should not return anything

assert.strictEqual(three.toString(), '3', '3 and "3" are not strictly equal');

assert.notEqual(three, 'three', 'the integer 3 is not equal to three');

assert.ok(true, 'truthy');

//assert.ok(false, 'not true'); // will throw error

// async test pattern

var squareAsync = function (a, callback) {
    result = a * a;
    callback(result);
}

squareAsync(three, function (result) {
    assert.equal(result, 9, '3 squared is nine');
});