"use strict"

/*global require exports*/
var fs = require('fs');
var sqlite3 = require('sqlite3');
var md = require('markdown').markdown;
var db = new sqlite3.Database('./db/database.db');

var parseMD = function mdToHtml(markdown) {
    var tree = md.parse(markdown);
    fs.writeFileSync("temp/tree.txt", JSON.stringify(tree));
    var title = tree[2][2].replace(/\s+/, "_");
    return {title: title,
            markdown: markdown,
            html: md.toHTML(markdown)};
};

exports.toRestFull = function toRestFull(req, res, next) {
    if (req.params.namespace !== undefined) {
        db.get("SELECT namespace_id FROM namespaces WHERE namespace_name=?", req.params.namespace, function(err, row) {
            req.params.namespace_id = row.namespace_id;
            next();
        });
    }
};

exports.showPages = function showPages(req, res, next) {
    db.all("SELECT * FROM pages WHERE page_namespace_id=?", req.params.namespace_id, function(err, rows) {
        res.render("pagesIndex.html.ejs", {pages: rows});
        next();
    });
};

exports.showNewPageForm = function showNewPageForm(req, res, next) {
    res.render("newPage.html.ejs", req.params);
};

exports.createNewPage = function createNewPage(req, res, next) {
    var markdown = req.body.markdown;
    var parsed = parseMD(markdown);

    function insertRevision(textID, pageID){
        db.run("INSERT INTO revs (rev_page_id, rev_text_id) VALUES (?, ?)", pageID, textID, function(err){
            if (err) {
                console.log(err);
            } else {
                next();
            }
        });
    }
    
    function insertTitle(textID) {
        db.run("INSERT INTO pages (page_namespace_id, page_title) VALUES (?, ?)", req.params.namespace_id, parsed.title, function(err){
            if (err) {
                console.log(err);
            } else {
                insertRevision(textID, this.lastID);
            }
        });
    }

    function insertText() {
        db.run("INSERT INTO texts (text_markdown, text_html) VALUES (?, ?)", parsed.markdown, parsed.html, function(err){
            if (err) {
                console.log(err);
            } else {
                insertTitle(this.lastID);
            }
        });
    }
    
    insertText();    
};

exports.showPage = function showPage(req, res, next) {
    db.get("SELECT text_html, max(rev_timestamp) FROM (SELECT texts.text_html, revs.rev_timestamp FROM pages INNER JOIN revs ON pages.page_id=revs.rev_page_id INNER JOIN texts ON revs.rev_text_id=texts.text_id WHERE pages.page_id=?)", req.params.page_id, function(err, row) {
        res.render("show.html.ejs", {html: row.text_html, page_id: req.params.page_id});
    });
};

exports.showEditPage = function showEditPage(req, res, next) {
    db.get("SELECT text_markdown, max(rev_timestamp) FROM (SELECT texts.text_markdown, revs.rev_timestamp FROM pages INNER JOIN revs ON pages.page_id=revs.rev_page_id INNER JOIN texts ON revs.rev_text_id=texts.text_id WHERE pages.page_id=?)", req.params.page_id, function(err, row) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("edit.html.ejs", {markdown: row.text_markdown, page_id: req.params.page_id});
        }
    });
};

exports.updatePage = function updatePage(req, res, next) {
    var markdown = req.body.markdown;
    var parsed = parseMD(markdown);
    console.log(markdown);
    console.log(parsed);
    
    function insertRevision(textID){
        db.run("INSERT INTO revs (rev_page_id, rev_text_id) VALUES (?, ?)", req.params.page_id, textID, function(err){
            if (err) {
                console.log(err);
            } else {
                next();
            }
        });
    }

    function insertText() {
        db.run("INSERT INTO texts (text_markdown, text_html) VALUES (?, ?)", parsed.markdown, parsed.html, function(err){
            if (err) {
                console.log(err);
            } else {
                insertRevision(this.lastID);
            }
        });
    }

    insertText();
    
};
