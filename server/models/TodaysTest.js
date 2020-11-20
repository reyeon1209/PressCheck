const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodaysTestSchema =  mongoose.Schema({
    _id: { type: Schema.Types.ObjectId },
    press: { type: String },
});

const TodaysTest = mongoose.model('TodaysTest', TodaysTestSchema, 'TodaysTest');

module.exports = { TodaysTest };