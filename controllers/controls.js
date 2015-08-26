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

exports.showPages = function showPages(req, res, next) {
    db.all("SELECT page_title FROM pages WHERE page_namespace_id=?", req.params.namespace_id, function(err, rows) {
        res.render("pagesIndex.html.ejs", {pages: rows});
        next();
    });
};

exports.showNewPageForm = function showNewPageForm(req, res, next) {
    res.render("newPage.html.ejs", req.params);
};

exports.createNewPage = function createNewPage(req, res, next) {
    console.log(req.body);
};

