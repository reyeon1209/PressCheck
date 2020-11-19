const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodaysTestSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    press: { type: String },
});

const TodaysTest = mongoose.model('TodaysTest', TodaysTestSchema);

module.exports = { TodaysTest };