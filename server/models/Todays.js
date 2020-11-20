const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodaysSchema = new Schema({
    _id: Schema.Types.ObjectId,
    all_keyword: Array
});

const Todays = mongoose.model('todays', TodaysSchema, "todays");

module.exports = { Todays };