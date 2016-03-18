/**
 * Created by Huang, Fuguo (aka Ken) on 18/03/2016.
 */
var express = require('express');
var router = express.Router();

var products = [
    { id: 0, name: 'watch', description: 'Tell time with this amazing watch', price: 30.00 },
    { id: 1, name: 'sandals', description: 'Walk in comfort with these sandals', price: 10.00 },
    { id: 2, name: 'sunglasses', description: 'Protect your eyes in style', price: 25.00 }
];

router.get('/', function (req, res, next) {
    res.json(products);
});

router.get('/:id', function (req, res, next) {
    if (req.params.id > (products.length - 1) || req.params.id < 0) {
        res.statusCode = 404;
        res.end('Not Found');
    }
    res.json(products[req.params.id]);
});

router.post('/', function (req, res) {
    if (typeof req.body.name === ' undefined') {
        res.statusCode = 400;
        res.end('a prodcut name is required');
    }
    products.push(req.body);
    res.send(req.body);
});

router.put('/:id', function (req, res) {
    if (req.params.id > (products.length - 1) || req.params.id < 0) {
        res.statusCode = 404;
        res.end('not found');
    }
    products[req.params.id] = req.body;
    res.send(req.body);
})

router.delete('/:id', function (req, res) {
    if (req.params.id > (products.length - 1) || req.params.id < 0) {
        res.statusCode = 404;
        res.end('not found for that id');
    }
    products.splice(req.params.id, 1);
    res.json(products);
})

module.exports = router;