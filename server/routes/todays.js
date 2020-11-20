const express = require('express');
const router = express.Router();
const { Todays } = require('../models/Todays');

router.get('/', (req, res) => {
    Todays.find({})
        .exec((err, todays) => {
            if (err)    return  res.status(400).send(err);
            res.status(200).json(todays);
        });
});

module.exports = router;