const router = require('express').Router();
const { Model } = require('mongoose');
let MostRead = require('../models/MostRead');

router.route('/').get((req, res) => {
    let variable = {};

    MostRead.find(variable)
        .exec((err, mostRead) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json(mostRead);
        });
});

router.route('/getId').get((req, res) => {
    MostRead.find(variable).where('_id')
        .exec((err, mostRead) => {
            if (err) return res.status(400).send(err);
            res.status(200).json(mostRead);
        })
})

module.exports = router;