const router = require('express').Router();
let MostRead = require('../models/MostRead');

router.route('/').get((req, res) => {
    let variable = {};

    MostRead.find(variable)
        .exec((err, mostRead) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json({ success: true, mostRead });
        });
});

module.exports = router;