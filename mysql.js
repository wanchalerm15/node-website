/* 
    docs: https://github.com/mysqljs/mysql#install  
    example:

    const router = require('express').Router();
    router.get('/', (req, res) => {
        req.db.execute('select * from my_table', true)
            .then(rows => {
                res.json(rows);
            })
            .catch(err => res.json(err));
    });

*/

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '<hostname>',
    user: '<username>',
    password: '<password>',
    database: '<database name>'
});

module.exports = function (req, res, next) {
    const database = connection;
    database['execute'] = (sql, single = false) => {
        return new Promise((resolve, reject) => {
            database.query(sql, (err, rows, fields) => {
                if (err) return reject(err);
                if (single) resolve(rows.length == 0 ? null : rows[0]);
                else resolve(rows);
            });
        });
    };

    req.db = database;
    next();
};