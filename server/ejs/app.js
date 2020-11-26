var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('view', './views');

app.get('/', (res, res) => {
    res.render('view');
})