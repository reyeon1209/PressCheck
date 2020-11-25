const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SimilaritySchema = mongoose.Schema({
    origin_id: { type: Schema.Types.ObjectId },
    target_id: { type: Schema.Types.ObjectId },
    similarity: { type: Number },
    ranking: { type: Number },
    diffKeyword: { type: Array },
    press: { type: String },
    title: { type: String }
});

const Similarity = mongoose.model('similarity', SimilaritySchema, "similarity");

module.exports = Similarity;