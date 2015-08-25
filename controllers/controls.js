"use strict"

/*global require exports*/
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./db/database.db');

exports.toRestFull = function toRestFull(req, res, next) {
    if (req.params.namespace !== undefined) {
        db.get("SELECT namespace_id FROM namespaces WHERE namespace_name=?", req.params.namespace, function(err, row) {
            req.params.namespace_id = row.namespace_id;
            next();
        });
    }
};

