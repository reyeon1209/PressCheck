const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = mongoose.Schema({
    title: { type: String },
    link: { type: String },
    press: { type: String },
    category: { type: String },
    uploaded: { type: String },
    updated: { type: String },
    editor: { type: String },
    img_src: { type: String },
    content: { type: String },
    keyword: { type: Array },
    sum_short: { type: String },
    sum_mid: { type: String },
    sum_long: { type: String }
});

const Article = mongoose.model('collected', ArticleSchema, "collected");

module.exports = { Article };