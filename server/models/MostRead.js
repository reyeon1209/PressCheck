const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MostReadSchema = new Schema({
    title: String,
    link: String,
    img_src: String,
    similarity: Number
});

const MostRead = mongoose.model('mostRead', MostReadSchema, "mostRead");

module.exports = MostRead;