const express = require('express');
const router = express.Router();
const { ArticleTest } = require('../models/ArticleTest');

router.get('/', (req, res) => {
    ArticleTest.find({})
        .exec((err, articles) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json({ success: true, articles });
        });
});

module.exports = router;