/**
 * Created by Huang, Fuguo (aka Ken) on 11/03/2016.
 */
process.emit('power::init'); // fire event

exports.power = function(base, exponent) {
    var result = 1;
    process.emit('power::begin');
    for (var count = 0; count < exponent; count++ ) {
        result *= base;
    }
    return result;
};

