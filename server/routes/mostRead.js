const router = require('express').Router();
const { mongoose } = require('mongoose');
let MostRead = require('../models/MostRead');

router.route('/').get((req, res) => {
    MostRead.find()
        .exec((err, mostRead) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json(mostRead);
        });
});

router.route('/getLink').get((req, res) => {
    MostRead.find({}, {link: true, _id: false})
        .exec((err, mostRead) => {
            if (err)  return  res.status(400).send(err);
            res.json(mostRead);
        });
});

module.exports = router;