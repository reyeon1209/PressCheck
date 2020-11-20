const express = require('express');
const router = express.Router();
const { Article } = require('../models/Article');

router.get('/', (req, res) => {
    let variable = {};

    Article.find(variable)
        .exec((err, articles) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json({ success: true, articles });
        });

});

module.exports = router;