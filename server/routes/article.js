const express = require('express');
const router = express.Router();
const { Article } = require('../models/Article');

router.get('/', (req, res) => {
    let variable = {};

    Article.find(variable)
        .exec((err, articles) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json(articles);
        });

});

router.get('/analyze', (req, res) => {
    let _id = "5fb76446a38ae36b6c1b29ee";

    Article.findById(_id)
        .exec((err, articles) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json(articles);
        });

});

module.exports = router;