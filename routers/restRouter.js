"use strict"

/*global require module*/

var express = require("express");
var ejs = require("ejs");
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var methodOverride = require('method-override');
var c = require("../controllers/controls");

// initializarations
var router = express.Router();

// middleware
router.use(urlencodedBodyParser);
router.use(methodOverride('_method'));
router.use(express.static('public'));



router.get("/", function(req, res) {
    console.log(req.route.stack[0].method + ": " + req.route.path);
    res.redirect("/index");
});

router.get("/index", function(req, res) {
    console.log(req.route.stack[0].method + ": " + req.route.path);
});


router.get("/:namespace/:title", c.toRestFull, function(req, res) {
    console.log(req.route.stack[0].method + ": " + req.route.path);
    console.log(req.params);
});

router.get("/namespace/:namespace_id/page/:page_id", function(req, res) {
    console.log(req.route.stack[0].method + ": " + req.route.path);
    console.log(req.params);
});


module.exports = router;
