const express = require('express');
const router = express.Router();
const { ArticleTestSchema } = require('../models/ArticleTest.model');

router.get('/articleTest', (req, res) => {
    ArticleTestSchema.find()
        .then(ArticleTestSchema => res.json(ArticleTestSchema))
        .exec((err, articles) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json({ success: true, articles });
        });
});

module.exports = router;