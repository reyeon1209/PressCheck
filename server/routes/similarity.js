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

router.get('/report', (req, res) => {
    let origin_id = "5fba0620a26669575d73c8d2";

    Similarity.find({ "origin_id": ObjectId(origin_id) })
        .exec((err, similarities) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json(similarities);
        });
        
});

module.exports = router;