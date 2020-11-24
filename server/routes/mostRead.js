const router = require('express').Router();
const { mongoose } = require('mongoose');
const { collection } = require('../models/MostRead');
let MostRead = require('../models/MostRead');

router.route('/').get((req, res) => {
    MostRead.find()
        .exec((err, mostRead) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json(mostRead);
        });
});

module.exports = router;
