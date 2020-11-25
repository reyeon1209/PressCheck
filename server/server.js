const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
const port = process.env.PORT || 1818;

require('dotenv').config();

mongoose.connect(process.env.ATLAS_URI, { 
  useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true, useFindAndModify: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
connection.on('open', () => {
  connection.db.listCollections().toArray(function (err, collectionNames) {
    if (err) {
      console.log(err);
      return;
    }
      //console.log(collectionNames);
      //connection.close();
  });
});


app.use(cors())
app.use(express.json());


app.use('/article', require('./routes/article'));
app.use('/mostRead', require('./routes/mostRead'));
app.use('/similarity', require('./routes/similarity'));
app.use('/todays', require('./routes/todays'));


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
