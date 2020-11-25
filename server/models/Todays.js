const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodaysSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    category: { type: String },
    link: { type: Array },
    keyword: { type: Array },
    timeKeywords: { type: Array },
    headline: { type: Array }   // link 들어가면 수정 필요
});

const Todays = mongoose.model('todays', TodaysSchema, "todays");

module.exports = { Todays };