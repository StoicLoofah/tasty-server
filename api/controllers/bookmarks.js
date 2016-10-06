'use strict';

var util = require('util');

var Bookmark = require('../../models/bookmark').Bookmark;
var Tag = require('../../models/tag').Tag;

module.exports = {
    createBookmark: createBookmark,
    deleteBookmark: deleteBookmark,
    getBookmarks: getBookmarks,
    updateBookmark: updateBookmark
}

function getOrCreateTags(tagNames, callback) {

    if(!tagNames) {
        callback([]);
        return;
    }

    var realTags = [];
    var collectTags = function(tag) {
        realTags.push(tag);
        if(realTags.length == tagNames.length) {
            callback(realTags);
        }
    }

    tagNames.forEach(function(tagName) {
        var query = Tag.findOne({name: tagName}, function(err, tag) {
            if(tag) {
                collectTags(tag);
            } else {
                tag = new Tag({name: tagName});
                tag.save(function(err, tag) {
                    collectTags(tag);
                });
            }
        });
    });

}

function createBookmark(req, res) {
    var bookmark = new Bookmark({
        notes: req.body.notes,
        title: req.body.title,
        url: req.body.url,
    });

    getOrCreateTags(req.body.tags, function(realTags) {
        bookmark.tags = realTags;
        bookmark.save(function(err, bookmark) {
            if(err) return console.error(err);
            res.status(201).send(bookmark.toJson());
        });
    });
}

function deleteBookmark(req, res) {
    Bookmark.remove({_id: req.swagger.params.bookmark_id.value}, function(err, removed) {
        if(err) return console.error(err);
        res.send({removed: 1});
    });
}

function updateBookmark(req, res) {
    Bookmark.findOne({_id: req.swagger.params.bookmark_id.value}, function(err, bookmark) {
        if(err) return console.error(err);

        bookmark.notes = req.body.notes;
        bookmark.title = req.body.title;
        bookmark.url = req.body.url;

        getOrCreateTags(req.body.tags, function(realTags) {
            bookmark.tags = realTags;
            bookmark.save(function(err, bookmark) {
                if(err) return console.error(err);
                res.send(bookmark.toJson());
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
