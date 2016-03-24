/**
 * Created by ibm on 23/03/2016.
 */
var nano = require('nano')('http://localhost:5984');

nano.db.create('products', function(err, body, header) {
    if (err) {
        console.log(err);
    }
    console.log(body, header);
});

var products = nano.db.use('products', function (err, body, header) {
    if (err) {
        console.log(err);
    }
    console.log(body, header);
});

products.insert({name:'sandals', description: 'for your feet', price: 12.00},
    'sandals', function (err, body) {
        if(err) {
            console.log(err);
        }
        console.log(body, header);
    });

products.get('sandals', {
    ref_into: true
}, function (err, body, header) {
    if(err) {
        console.log(err);
    }
    console.log(body, header);
});

products.get('sandals', function (err, body, header) {
    if(!err) {
        products.insert({
            name: 'sandals',
            description: 'flip flops',
            price: 12.00,
            _rev_: body._rev // update the same item, nature of couchdb
        }, function (err, body, header) {
            if (!err) {
                console.log(body, header);
            }
        })
    }
});