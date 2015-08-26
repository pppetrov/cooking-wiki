"use strict"

/*global require*/

var express = require("express");
var ejs = require("ejs");
var router = require("./routers/router");
var restRouter = require("./routers/restRouter");

// initializartions
var app = express();

app.set('view engine', 'ejs');
// middleware
// app.use(favicon(__dirname + '/public/images/favicon.png')); 

app.listen(4000, function() {
    console.log("I'm listening");
});

app.use("/", restRouter);
