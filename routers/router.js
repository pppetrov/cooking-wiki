"use strict"

/*global require module*/

var express = require("express");
var fs = require("fs");
var ejs = require("ejs");
var favicon = require("express-favicon");
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var methodOverride = require('method-override');
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('./db/database.db');

// initializartions
var router = express.Router();

// middleware
// router.use(favicon(__dirname + '/public/images/favicon.png')); 
router.use(urlencodedBodyParser);
router.use(methodOverride('_method'));
router.use(express.static('public'));



var toRestFull = function toRestFull(req, res, next) {
    if (req.params.namespace !== undefined) {
        db.get("SELECT namespace_id FROM namespaces WHERE namespace_name=?", req.params.namespace, function(err, row) {
            req.params.namespace_id = row.namespace_id;
            next();
        });
    }
};


router.get("/", function(req, res) {
    console.log(req.route.stack[0].method + ": " + req.route.path);
    res.redirect("/index");
});

router.get("/index", function(req, res) {
    console.log(req.route.stack[0].method + ": " + req.route.path);
});


router.get("/:namespace/:title", toRestFull, function(req, res) {
    console.log(req.route.stack[0].method + ": " + req.route.path);
    console.log(req.params);
});

router.get("/namespace/:namespace_id/page/:page_id", function(req, res) {
    console.log(req.route.stack[0].method + ": " + req.route.path);
    console.log(req.params);
});


module.exports = router;
