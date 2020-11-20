const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Article } = require('../models/Article');
const http = require('http');
const { response } = require('express');

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

router.get('/searchAddr', (req, res) => {
    /*http.get({url: 'http://localhost:1818/mostRead/getLink'})
    .then(response => {
        res.status(200).json(response)
    })*/
    let target_links;

    axios.get('http://localhost:1818/mostRead/getLink')
        .then(function (response) {
            // target_links = Object.keys(response.data);
            // console.log(response.data);
            // console.log(target_links);
            target_links = response.data;

            let test = JSON.stringify(target_links);
            // let test2 = JSON.parse(test)[0].link;
            console.log(test);
            // console.log(test2);
        })
        .catch(function(err) {
            console.log(err);
        })
})

module.exports = router;