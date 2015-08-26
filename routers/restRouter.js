"use strict"

/*global require module*/

var express = require("express");

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
    res.render("index.html.ejs");
});


router.get("/namespace/:namespace_id/pages", c.showPages);

router.get("/namespace/:namespace_id/pages/new", c.showNewPageForm);

router.post("/namespace/:namespace_id/pages", c.createNewPage);

module.exports = router;
