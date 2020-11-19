const express = require("express");
const app = express();
const cors = require('cors')

const mongoose = require("mongoose");
require('dotenv').config();

app.use(cors())
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
  useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true, useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use('/articleTest', require('./routes/articleTestSheets'));
app.use('/todaysTest', require('./routes/todaysTestSheets'));

const port = process.env.PORT || 1818;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
