var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
//var mongoose    = require('mongoose');
//var routes = require('./routes/routes');

app.listen(3000, function(){
  console.log('start server');
});
/*
//view engine setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// [CONFIGURE ROUTER]
var router = require('./routes')(app)

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

mongodb.connectDB();
module.exports = app;*/