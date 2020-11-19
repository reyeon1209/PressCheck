const router = require('express').Router();
let todaysTestSchema = require('../models/todaysTest.model');

router.route('/').get((req, res) => {
    todaysTestSchema.find()
        .then(todaysTestSchema => res.json(todaysTestSchema))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;