const express = require('express');
const router = express.Router();
const { Todays } = require('../models/Todays');

router.get('/', (req, res) => {
    Todays.find({ category: '전체' })
        .exec((err, todays) => {
            if (err)    return  res.status(400).send(err);
            res.status(200).json(todays);
        });
});

router.post('/category', (req, res) => {
    var tab = req.body.category;
    Todays.find({ category: tab })
        .exec((err, todays) => {
            if (err)    return  res.status(400).send(err);
            res.status(200).json(todays);
        });
});

module.exports = router;