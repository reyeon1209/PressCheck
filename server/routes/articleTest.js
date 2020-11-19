const express = require('express');
const router = express.Router();
const { ArticleTest } = require('../models/ArticleTest');

router.get('/', (req, res) => {
    ArticleTest.find({})
        .exec((err) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json({ArticleTest});
        });
});

module.exports = router;