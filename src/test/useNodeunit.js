/**
 * Created by ibm on 24/03/2016.
 */
// npm insall nodeunit
var test = require('nodeunit');

module.exports = {
    'nodeUnitTest' : {
        'equal' : function (test) {
            test.equal(3, '3', '3 euqals "3"');
            test.done();
        },
        'strictEqual': function (test) {
            test.strictEqual('3', 3, '3 and "3" are not strictly equal');
            test.done();
        },
        "notEqual": function (test) {
            test.notEqual(3,'three', '3 does not equal to "three"');
            test.done();
        },
        'ok':function (test) {
            test.ok(false, "not true");
            test.done(); // just to tell the test is done
        }
    }
}

// run: nodeunit useNodeunit.js