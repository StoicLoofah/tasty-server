var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bookmark = new Schema({
    notes: String,
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    timeAdded: {type: Date, default: Date.now},
    title: String,
    url: String,
});

Bookmark.methods.toJson = function() {
    var data = {
        notes: this.notes,
        tags: [],
        timeAdded: this.timeAdded,
        title: this.title,
        url: this.url,
    };
    data.tags = this.tags.map(function(elem) {
        return elem.name;
    });
    data.tags.sort();
    return data;
};

module.exports = {
    Bookmark: mongoose.model('Bookmark', Bookmark),
};
