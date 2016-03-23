/**
 * Created by ibm on 23/03/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/test');

var productModel = new Schema({
    productId: ObjectId,
    name: String,
    description: String,
    price: Number
});

var Product = mongoose.model('Product', productModel);

var sandal = new Product({
    name: 'sandal',
    description: 'something for your feet',
    price: 12
});

sandal.save(function(err){
   if (err) {
       console.log(err);
   }
   console.log('created!');
});

Product.find({name: 'sandal'}).exec(function (err, product) {
    if (err) {
        console.log(err);
    }
    console.log(product);
});