var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bookmark = new Schema({
    notes: String,
    tags: [String],
    timeAdded: {type: Date, default: Date.now},
    title: String,
    url: String,
});

module.exports = {
    Bookmark: mongoose.model('Bookmark', Bookmark),
};
