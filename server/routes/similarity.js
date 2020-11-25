const express = require('express');
const router = express.Router();
const Similarity = require('../models/Similarity');
var ObjectId = require('mongodb').ObjectID;

router.route('/').get((req, res) => {
    let variable = {};

    Similarity.find(variable)
        .exec((err, similarities) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json(similarities);
        });

});

router.post('/report', (req, res) => {
    var _id = req.body.id;

    Similarity.find({ "origin_id": ObjectId(_id) })
        .sort({ similarity: 'asc' })
        .exec((err, similarities) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json(similarities);
        });
        
});

module.exports = router;