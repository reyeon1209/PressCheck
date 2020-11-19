const express = require('express');
const router = express.Router();
const { CollectedArticle } = require('../models/CollectedArticle');

router.get('/', (req, res) => {
    CollectedArticle.find({})
        .exec((err) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json({CollectedArticle});
        });
});

module.exports = router;