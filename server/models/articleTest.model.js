const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleTestSchema = new Schema({
    "_id": Schema.Types.ObjectId,
    "title": String,
    "press": String,
    "category": String,
    "uploaded": String,
    "updated": String,
    "editor": String,
    "img_src": String,
    "content": String,
    "Keyword": Array,
    "sum_short": String,
    "sum_mid": String,
    "sum_long": String
});

const articleTestSheet = mongoose.model('articleTest', articleTestSchema);

module.exports = articleTestSheet;