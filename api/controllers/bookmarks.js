'use strict';

var util = require('util');

var Bookmark = require('../../models/bookmark').Bookmark;
var Tag = require('../../models/tag').Tag;

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

    var realTags = [];
    var collectTags = function(tag) {
        realTags.push(tag);
        if(realTags.length == req.body.tags.length) {
            bookmark.tags = realTags;
            bookmark.save(function(err, bookmark) {
                if(err) return console.error(err);
                res.status(201).send(bookmark.toJson());
            });
        }
    }

    req.body.tags.forEach(function(tagName) {
        var query = Tag.findOne({name: tagName}, function(err, tag) {
            if(tag) {
                collectTags(tag);
            }
            tag = new Tag({name: tagName});
            tag.save(function(err, tag) {
                collectTags(tag);
            });
        });
    });

}

function getBookmarks(req, res) {
    Bookmark.find().populate('tags').exec(function(err, bookmarks) {
        if(err) return console.error(err);
        res.send(bookmarks.map(function(bookmark) { return bookmark.toJson() }));
    });
}
