const express = require('express');
const router = express.Router();
const { TodaysTestSchema } = require('../models/TodaysTest.model');

router.get('/todaysTest', (req, res) => {
    TodaysTestSchema.find()
        .then(TodaysTestSchema => res.json(TodaysTestSchema))
        .exec((err, todays) => {
            if (err)    return  res.status(400).send(err);
            res.status(200).json({ success: true, todays });
        });
});

module.exports = router;