/**
 * Created by ibm on 24/03/2016.
 */
// npm install chai
var chai = require('chai');

var assert = chai.assert; // chai's assert module

assert.equal(three, '3', '3 == "3"');

assert.strictEqual('3', three.toString(), '3 and "3" are not strict euqual');

assert.ok(true, 'is truthy');

// Chai is mainly used for Behaviour testing
var expect = chai.expect;

expect(three).to.be.a('number');

var should = chai.should();

three.should.be.a('number');

three.should.be.a('String'); // this should fail

// run: node useChai.js

// async test pattern

var squareAsync = function (a, callback) {
    result = a * a;
    callback(result);
}

squareAsync(three, function (result) {
    assert.equal(result, 9, '3 squared is nine');
})