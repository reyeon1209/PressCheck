const router = require('express').Router();
let MostRead = require('../models/MostRead');

router.route('/').get((req, res) => {
    MostRead.find()
        .then(mostRead => res.json(mostRead))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;