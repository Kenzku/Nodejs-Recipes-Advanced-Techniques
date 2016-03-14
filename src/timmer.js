/**
 * Created by Huang, Fuguo (aka Ken) on 11/03/2016.
 */
var count = 0;
var getMockData = function (callback) {
    var obj = {
        status: 'looking good',
        data: [
            "item0",
            "item1"
        ],
        numberOfCalls: count++
    };

    return callback(null, obj);
}

var onDataSuccess = function(err, data) {
    if (err) {console.log(err);}
    if (data.numberOfCalls > 15) {
        clearInterval(interval);
    }
    console.log(data);
}

setImmediate(getMockData, onDataSuccess);

var timmer = setTimeout(getMockData, 2e3, onDataSuccess);

timmer.unref(); // terminate the event loop if the timmer is the only left in the event loop
var interval = setInterval(getMockData, 50, onDataSuccess);