'use strict';

var util = require('util');

var Bookmark = require('../../models/bookmark').Bookmark;

module.exports = {
    createBookmark: createBookmark,
    getBookmarks: getBookmarks
}

function createBookmark(req, res) {
    var bookmark = new Bookmark({
        notes: req.body.notes,
        title: req.body.title,
        url: req.body.url,
    });
    bookmark.save(function(err, bookmark) {
        if(err) return console.error(err);
        res.status(201).send(bookmark);
    });
}

function getBookmarks(req, res) {
    Bookmark.find({}, function(err, bookmarks) {
        if(err) return console.error(err);
        res.send(bookmarks)
    });
}
