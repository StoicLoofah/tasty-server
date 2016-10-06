var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tag = new Schema({
    name: String,
    timeAdded: {type: Date, default: Date.now},
});

module.exports = {
    Tag: mongoose.model('Tag', Tag),
};
