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
    let _id = "5fba0625a26669575d73c8d7";

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
    let target_links_list;

    axios.get('http://localhost:1818/mostRead/getLink')
        .then(function (response) {
            // target_links = Object.keys(response.data);
            // console.log(response.data);
            let target_links = [];
            target_links = response.data.map(ind => {
                return ind['link'];
            })
            console.log(target_links);

        })
        .catch(function(err) {
            console.log(err);
        })
})

router.get('/press', (req, res) => {
    var press = req;
    console.log('body : ' + req.body);
    console.log('press : ' + req.body.press);

    press = 'hankyoreh';
    switch (press) {
        case 'hankyoreh': press = '한겨레'; break;
        case 'jungang': press = '중앙'; break;
        case 'donga': press = '동아'; break;
        case 'kukmin': press = '국민'; break;
        case 'yeonhap': press = '연합'; break;
    }
    
    Article.find({ press: press })
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            res.status(200).json(articles);
        })
})

module.exports = router;