const express = require('express');
const router = express.Router();
const { TodaysTest } = require('../models/TodaysTest');

router.get('/', (req, res) => {
    TodaysTest.find({})
        .exec((err, todays) => {
            if (err)    return  res.status(400).send(err);
            res.status(200).json({ success: true, todays });
        });
});

module.exports = router;