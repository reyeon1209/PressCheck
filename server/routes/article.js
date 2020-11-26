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

router.post('/link', (req, res) => {
    var link = req.body.link;
    Article.find({ _id: link })
        .exec((err, news) => {
            if (err)  return  res.status(400).send(err);
            res.json(news);
        });
});

router.post('/url', (req, res) => {
    var url = req.body.url;
    Article.find({ link: url })
        .exec((err, news) => {
            if (err)  return  res.status(400).send(err);
            res.json(news);
        });
});

router.post('/analyze', (req, res) => {
    var _id = req.body.id;

    Article.findById(_id)
        .exec((err, articles) => {
            if (err)  return  res.status(400).send(err);
            res.status(200).json(articles);
        });

});

router.post('/table', (req, res) => {
    var category = req.body.category;
    var press = req.body.press;
    
    Article.find({ press: press, category: category })
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            res.status(200).json(articles);
        })
});

module.exports = router;