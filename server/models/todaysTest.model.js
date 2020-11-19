const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodaysTestSchema = new Schema({
    "_id": Schema.Types.ObjectId,
    "press": String,
});

const TodaysTestSheet = mongoose.model('TodaysTest', TodaysTestSchema);

module.exports = TodaysTestSheet;