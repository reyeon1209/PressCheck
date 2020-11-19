const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleTestSchema = new Schema({
    "_id": Schema.Types.ObjectId,
    "title": String,
    "link": String,
    "press": String,
    "category": String,
    "uploaded": String,
    "updated": String,
    "editor": String,
    "img_src": String,
    "content": String,
    "keyword": Array,
    "sum_short": String,
    "sum_mid": String,
    "sum_long": String
});

const ArticleTestSheet = mongoose.model('ArticleTest', ArticleTestSchema);

module.exports = ArticleTestSheet;