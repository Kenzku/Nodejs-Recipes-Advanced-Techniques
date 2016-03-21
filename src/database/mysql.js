/**
 * Created by Huang, Fuguo (aka Ken) on 21/03/2016.
 */

var mysql = require('mysql');

var connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sakila' // https://dev.mysql.com/doc/sakila/en/sakila-installation.html
};

var connection = mysql.createConnection(connectionConfig);

connection.connect(function (err) {
    console.log('connection::connected');
});

connection.query('SELECT * FROM actor', function (err, rows, fields) {
    if (err) {
        throw err;
    }
    rows.forEach(function (row) {
        console.log(row.first_name, row.last_name);
    })
});

var actor = {
    first_name: 'Wil', last_name: 'Wheaton'
};

connection.query('INSERT INTO actor SET ?', actor, function (err, results) {
    if (err) throw err;

    console.log(results);
});

connection.end(function (err) {
    console.log('connection::end');
})