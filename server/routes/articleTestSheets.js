const router = require('express').Router();
let articleTestSchema = require('../models/articleTest.model');

router.route('/').get((req, res) => {
    articleTestSchema.find()
        .then(articleTestSchema => res.json(articleTestSchema))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;