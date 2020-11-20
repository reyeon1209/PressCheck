const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todaysTestSchema = new Schema({
    "_id": Schema.Types.ObjectId,
    "press": String,
});

const todaysTestSheet = mongoose.model('todaysTest', todaysTestSchema);

module.exports = todaysTestSheet;