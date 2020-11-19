const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectedArticleSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    title: { type: String },
    link: { type: String },
    press: { type: String },
    category: { type: String },
    uploaded: { type: String },
    updated: { type: String },
    editor: { type: String },
    img_src: { type: String },
    content: { type: String },
    keyword: { type: String },
    sum_short: { type: String },
    sum_mid: { type: String },
    sum_long: { type: String }
});

const CollectedArticle = mongoose.model('collectedArticle', CollectedArticleSchema);

module.exports = { CollectedArticle };