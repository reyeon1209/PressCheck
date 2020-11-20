const express = require('express');
const router = express.Router();
const { Subject } = require('../models/Subject');

router.get('/', (req, res) => {
    let variable = {};

    Subject.find(variable)
        .exec((err, subjects) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json({ success: true, subjects });
        });
});

module.exports = router;